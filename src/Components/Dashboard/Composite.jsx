import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";

ChartJS.register(...registerables);

const RealTimeChart = () => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");
  const [activeData, setActiveData] = useState([]);

  const fetchData = async () => {
    const currentTime = new Date().toISOString();
    const params = {
      start_date_time: new Date(Date.now() - 60000).toISOString(), // last one minute
      end_date_time: currentTime,
      resample_period: "T", // per minute
    };
    try {
      const [ebResponse, dgResponse, dg1s12Response] = await Promise.all([
        axios.get("https://www.therion.co.in/api/ebs10reading/", { params }),
        axios.get("https://www.therion.co.in/api/dg2s3reading/", { params }),
        axios.get("https://www.therion.co.in/api/dg1s12reading/", { params }),
      ]);

      const ebRecent = ebResponse.data["recent data"];
      const dgRecent = dgResponse.data["recent data"];
      const dg1s12Recent = dg1s12Response.data["recent data"];
      updateChartData(ebRecent, dgRecent, dg1s12Recent);
      updatePowerStatus(ebRecent, dgRecent, dg1s12Recent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateChartData = (ebRecent, dgRecent, dg1s12Recent) => {
    const newEntry = {
      time: ebRecent.timestamp || dgRecent.timestamp || dg1s12Recent.timestamp,
      ebKw: ebRecent.kwh,
      ebCurrent: ebRecent.average_current,
      dgKw: dgRecent.kwh,
      dgCurrent: dgRecent.average_current,
      dg1s12Kw: dg1s12Recent.kwh,
      dg1s12Current: dg1s12Recent.average_current,
    };

    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData.length > 15
        ? updatedData.slice(updatedData.length - 15)
        : updatedData;
    });

    setActiveData((prevData) => {
      let activeEntry = { time: newEntry.time, kwh: 0 };
      if (newEntry.ebCurrent > 0) {
        activeEntry = { time: newEntry.time, kwh: newEntry.ebKw, source: "EB" };
      } else if (newEntry.dgCurrent > 0) {
        activeEntry = {
          time: newEntry.time,
          kwh: newEntry.dgKw,
          source: "DG2S3",
        };
      } else if (newEntry.dg1s12Current > 0) {
        activeEntry = {
          time: newEntry.time,
          kwh: newEntry.dg1s12Kw,
          source: "DG1S12",
        };
      }
      const updatedActiveData = [...prevData, activeEntry];
      return updatedActiveData.length > 15
        ? updatedActiveData.slice(updatedActiveData.length - 15)
        : updatedActiveData;
    });
  };

  const updatePowerStatus = (ebRecent, dgRecent, dg1s12Recent) => {
    if (ebRecent.average_current > 0) {
      setPowerStatus("Running on EB Power");
    } else if (dgRecent.average_current > 0) {
      setPowerStatus("Running on Generator Power (DG2S3)");
    } else if (dg1s12Recent.average_current > 0) {
      setPowerStatus("Running on Generator Power (DG1S12)");
    } else {
      setPowerStatus("No Power");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // polling every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: activeData.map((item) => item.time),
    datasets: [
      {
        type: "line",
        label: "Active Power (kWh)",
        data: activeData.map((item) => item.kwh),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Active Power (kWh)",
        data: activeData.map((item) => item.kwh),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const maxKwh = Math.max(...activeData.map((item) => item.kwh), 0);
  const minKwh = Math.min(...activeData.map((item) => item.kwh), 0);

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "ll HH:mm",
        },
      },
      y: {
        title: {
          display: true,
          text: "Power (kWh)",
        },
        min: maxKwh - 5, // dynamically adjust the scale
        max: maxKwh + 2, // dynamically adjust the scale
      },
    },
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Real-Time Power Consumption
          </h6>
          <div>Power Status: {powerStatus}</div>
        </div>
        <div className="card-body">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeChart;
