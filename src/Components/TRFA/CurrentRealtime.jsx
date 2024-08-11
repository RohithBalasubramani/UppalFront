import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../Dashboard/realtimestyle.css"; // Import the shared CSS file

const RealTimeCurrentChart = ({ source }) => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");

  const getEndpoint = (source) => {
    switch (source) {
      case "eb":
        return "https://www.therion.co.in/api/ebs10reading/";
      case "dg1":
        return "https://www.therion.co.in/api/dg1s12reading/";
      case "dg2":
        return "https://www.therion.co.in/api/dg2s3reading/";
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
      phaseR: recentData.phase_1_current,
      phaseY: recentData.phase_2_current,
      phaseB: recentData.phase_3_current,
    };

    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData.length > 15
        ? updatedData.slice(updatedData.length - 15)
        : updatedData;
    });
  };

  const updatePowerStatus = (recentData) => {
    setPowerStatus(`Running on ${source.toUpperCase()}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // polling every 5 seconds

    return () => clearInterval(interval);
  }, [source]);

  const activeData = data.slice(-15);
  const labels = activeData.map((item) => item.time);

  const currentChartData = {
    labels,
    datasets: [
      {
        label: "Phase R Current",
        data: activeData.map((item) => item.phaseR),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
      {
        label: "Phase Y Current",
        data: activeData.map((item) => item.phaseY),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
      },
      {
        label: "Phase B Current",
        data: activeData.map((item) => item.phaseB),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
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
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
      },
      y: {
        title: {
          display: true,
          text: "Current (A)",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="containerchart">
      <div className="chart-cont">
        <div className="title">Current Chart</div>
        <div className="legend-container-two">
          <div className="legend-item">
            <span
              className="legend-color-box"
              style={{ backgroundColor: "rgba(255, 99, 132, 1)" }}
            />
            <span>Phase R Current</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color-box"
              style={{ backgroundColor: "rgba(54, 162, 235, 1)" }}
            />
            <span>Phase Y Current</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color-box"
              style={{ backgroundColor: "rgba(255, 206, 86, 1)" }}
            />
            <span>Phase B Current</span>
          </div>
        </div>
        <Line data={currentChartData} options={options} />
      </div>
      <div className="value-cont">
        <div className="value-heading">Current Values</div>
        <div className="current-value">Current Value</div>
        <div className="legend-container">
          <div className="legend-item-two">
            <div className="value-name">
              <span
                className="legend-color-box"
                style={{ backgroundColor: "rgba(255, 99, 132, 1)" }}
              />{" "}
              Phase R Current
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].phaseR.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">A</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span
                className="legend-color-box"
                style={{ backgroundColor: "rgba(54, 162, 235, 1)" }}
              />
              Phase Y Current
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].phaseY.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">A</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span
                className="legend-color-box"
                style={{ backgroundColor: "rgba(255, 206, 86, 1)" }}
              />
              Phase B Current
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].phaseB.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCurrentChart;
