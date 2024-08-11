import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import axios from "axios";
import "./realtimestyle.css"; // Import the shared CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

const RealTimeChart = () => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");
  const [activeData, setActiveData] = useState([]);

  // Fetch data from APIs
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

  // Update chart data
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

  // Update power status
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

  // Set up data fetching interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // polling every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Configure chart data
  const chartData = {
    labels: activeData.map((item) => item.time),
    datasets: [
      {
        type: "line",
        label: "Active Power (kWh)",
        data: activeData.map((item) => item.kwh),
        fill: true,
        borderColor: "#6a50a7", // Line color
        backgroundColor: "rgba(106, 80, 167, 0.2)", // Area fill color
        borderWidth: 2,
        pointRadius: 4, // Show points
        pointBackgroundColor: "#6a50a7", // Point color
        pointHoverRadius: 6,
        tension: 0.4, // Smooth line
      },
    ],
  };

  // Configure chart options
  const maxKwh = Math.max(...activeData.map((item) => item.kwh), 0);

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "ll HH:mm",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Light gray color for the grid
          borderDash: [5, 5], // Dotted line style
          borderWidth: 1, // Dotted line width
        },
      },
      y: {
        title: {
          display: true,
          text: "Power (kWh)",
        },
        min: maxKwh - 5, // dynamically adjust the scale
        max: maxKwh + 5, // dynamically adjust the scale
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Light gray color for the grid
          borderDash: [5, 5], // Dotted line style
          borderWidth: 1, // Dotted line width
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + " kWh";
            }
            return label;
          },
        },
      },
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  // Render the chart component
  return (
    <div className="containerchart">
      <div className="chart-cont">
        <div className="title">Energy Consumption</div>
        <div className="chart-size">
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div className="value-cont">
        <div className="value-heading">Energy Consumption</div>
        <div className="current-value">Current Value</div>
        <div className="power-value">
          {activeData.length > 0
            ? `${activeData[activeData.length - 1].kwh.toFixed(2)} `
            : "0.00"}{" "}
          <span className="value-span">kWh</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChart;
