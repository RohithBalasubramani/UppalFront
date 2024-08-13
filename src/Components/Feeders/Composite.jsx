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
      case "dg1":
        return "https://www.therion.co.in/api/dg1s12reading/";
      case "dg2":
        return "https://www.therion.co.in/api/dg2s3reading/";
      case "skyde":
        return "https://www.therion.co.in/api/skyd1reading/";
      case "utility":
        return "https://www.therion.co.in/api/utility1st2ndfs2reading/";
      case "sparestation3":
        return "https://www.therion.co.in/api/sparestation3reading/";
      case "zoho":
        return "https://www.therion.co.in/api/thirdfloorzohos4reading/";
      case "sparestation5":
        return "https://www.therion.co.in/api/sixthfloors5reading/";
      case "sparestation6":
        return "https://www.therion.co.in/api/spares6reading/";
      case "sparestation7":
        return "https://www.therion.co.in/api/spares7reading/";
      case "kotak":
        return "https://www.therion.co.in/api/thirdfifthfloorkotakreading/";
      case "solar":
        return "https://www.therion.co.in/api/solars13reading/";
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

  console.log("active data", activeData);

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
  const maxKwh = Math.max(...activeData.map((item) => item.kwh_eb));
  const minKwh = Math.min(...activeData.map((item) => item.kwh_eb));
  console.log("min", minKwh);

  const chartData = {
    labels: activeData.map((item) => item.time),
    datasets: [
      {
        type: "line",
        label: "Energy Consumption (Wh)",
        data: activeData.map((item) => item.kwh_eb),
        fill: true, // Fill the area under the line
        borderColor: "#6a50a7", // Line color
        backgroundColor: "rgba(106, 80, 167, 0.2)", // Area fill color
        // Area fill color
        borderWidth: 2,
        pointRadius: 0, // Hide points
        tension: 0.4, // Smooth line
      },
    ],
  };

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
        },
      },
      y: {
        title: {
          display: true,
          text: "Power (Wh)",
        },
        min: minKwh - 100, // Adjust min to be 100 less than the minimum kWh value
        max: maxKwh + 100, // Adjust max to be 100 more than the maximum kWh value
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
              label += context.parsed.y + " Wh";
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
              style={{ backgroundColor: "#6a50a7" }}
            />
            <span> Energy Consumption (Wh)</span>
          </div>
        </div>
        <div className="chart-size">
          <Line data={chartData} options={options} />
        </div>
      </div>
      <div className="value-cont">
        <div className="value-heading">Power Status</div>
        <div className="current-value">{powerStatus}</div>
        <div className="power-value">
          {activeData.length > 0
            ? `${activeData[activeData.length - 1].kwh_eb.toFixed(2)}`
            : "0.00"}{" "}
          <span className="value-span">Wh</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChart;
