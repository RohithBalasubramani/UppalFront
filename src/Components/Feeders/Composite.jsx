import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";

ChartJS.register(...registerables);

const RealTimeChart = ({ source }) => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");
  const [activeData, setActiveData] = useState([]);

  const getEndpoint = (source) => {
    switch (source) {
      case "eb":
        return "http://117.203.101.153/api/ebs10reading/";
      case "dg1":
        return "http://117.203.101.153/api/dg1s12reading/";
      case "dg2":
        return "http://117.203.101.153/api/dg2s3reading/";
      case "skyde":
        return "http://117.203.101.153/api/skyd1reading/";
      case "utility":
        return "http://117.203.101.153/api/utility1st2ndfs2reading/";
      case "sparestation3":
        return "http://117.203.101.153/api/sparestation3reading/";
      case "zoho":
        return "http://117.203.101.153/api/thirdfloorzohos4reading/";
      case "sparestation5":
        return "http://117.203.101.153/api/sixthfloors5reading/";
      case "sparestation6":
        return "http://117.203.101.153/api/spares6reading/";
      case "sparestation7":
        return "http://117.203.101.153/api/spares7reading/";
      case "kotak":
        return "http://117.203.101.153/api/thirdfifthfloorkotakreading/";
      case "solar":
        return "http://117.203.101.153/api/solars13reading/";
      default:
        throw new Error("Invalid source");
    }
  };

  const fetchData = async () => {
    const currentTime = new Date().toISOString();
    const params = {
      start_date_time: new Date(Date.now() - 60000).toISOString(), // last one minute
      end_date_time: currentTime,
      resample_period: "T", // per minute
    };
    try {
      const endpoint = getEndpoint(source);
      const response = await axios.get(endpoint, { params });

      const recentData = response.data["recent data"];
      updateChartData(recentData);
      updatePowerStatus(recentData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateChartData = (recentData) => {
    const newEntry = {
      time: recentData.timestamp,
      kwh_eb: recentData.kwh_eb,
      current: recentData.average_current,
    };

    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData.length > 15
        ? updatedData.slice(updatedData.length - 15)
        : updatedData;
    });

    setActiveData((prevData) => {
      const activeEntry = {
        time: newEntry.time,
        kwh_eb: newEntry.kwh_eb,
      };
      const updatedActiveData = [...prevData, activeEntry];
      return updatedActiveData.length > 15
        ? updatedActiveData.slice(updatedActiveData.length - 15)
        : updatedActiveData;
    });
  };

  const updatePowerStatus = (recentData) => {
    setPowerStatus("Data fetched");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // polling every 5 seconds

    return () => clearInterval(interval);
  }, [source]);

  const chartData = {
    labels: activeData.map((item) => item.time),
    datasets: [
      {
        type: "line",
        label: " Energy (W)",
        data: activeData.map((item) => item.kwh_eb),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Energy Wh",
        data: activeData.map((item) => item.kwh_eb),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const maxKwh = Math.max(...activeData.map((item) => item.kwh_eb), 0);
  const minKwh = Math.min(...activeData.map((item) => item.kwh_eb), 0);

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        title: {
          display: true,
          text: "Power (Wh) ",
        },
        min: maxKwh - 1000, // dynamically adjust the scale
        // max: maxKwh + 2, // dynamically adjust the scale
      },
    },
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Real-Time Power and Current Consumption
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
