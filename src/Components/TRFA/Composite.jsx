import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import "../Dashboard/realtimestyle.css"; // Import the shared CSS file

ChartJS.register(...registerables);

const RealTimeChart = ({ source }) => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");
  const [activeData, setActiveData] = useState([]);

  const getEndpoint = (source) => {
    switch (source) {
      case "eb":
        return "https://www.therion.co.in/api/ebs10reading/";
      case "dg2":
        return "https://www.therion.co.in/api/dg2s3reading/";
      case "dg1":
        return "https://www.therion.co.in/api/dg1s12reading/";
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
      kwh: recentData.kwh,
      current: recentData.average_current,
    };

    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData.length > 15
        ? updatedData.slice(updatedData.length - 15)
        : updatedData;
    });

    setActiveData((prevData) => {
      const activeEntry = { time: newEntry.time, kwh: newEntry.kwh };
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

  // Calculate max and min for y-axis based on active data
  const maxKwh = Math.max(...activeData.map((item) => item.kwh));
  const minKwh = Math.min(...activeData.map((item) => item.kwh));

  const chartData = {
    labels: activeData.map((item) => item.time),
    datasets: [
      {
        type: "line",
        label: "Active Power (kWh)",
        data: activeData.map((item) => item.kwh),
        fill: true, // Fill the area under the line
        borderColor: "#6a50a7", // Line color
        backgroundColor: "rgba(106, 80, 167, 0.2)", // Area fill color
        borderWidth: 2,
        pointRadius: 0, // Hide points
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "ll HH:mm",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Light gray color for the grid
          borderDash: [5, 5], // Dotted line style
        },
      },
      y: {
        title: {
          display: true,
          text: "Power (kWh)",
        },
        min: Math.max(minKwh - 100, 0), // Ensure minimum is not below zero
        max: maxKwh + 100, // 100 more than max value for padding
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Light gray color for the grid
          borderDash: [5, 5], // Dotted line style
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
        display: false, // Hide default legend to use custom styling
      },
    },
  };

  return (
    <div className="containerchart">
      <div className="chart-cont">
        <div className="title">Real-Time Power Consumption</div>
        <div className="legend-container-two">
          <div className="legend-item">
            <span
              className="legend-color-box"
              style={{ backgroundColor: "#4B2AA5" }}
            />
            <span> Active Power (kWh)</span>
          </div>
        </div>
        <Line data={chartData} options={options} />
      </div>
      <div className="value-cont">
        <div className="value-heading">Power Status</div>
        <div className="current-value">{powerStatus}</div>
        <div className="power-value">
          {activeData.length > 0
            ? `${activeData[activeData.length - 1].kwh.toFixed(2)}`
            : "0.00"}{" "}
          <span className="value-span">kWh</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChart;
