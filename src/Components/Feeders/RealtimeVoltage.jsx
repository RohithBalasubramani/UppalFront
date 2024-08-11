import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../Dashboard/realtimestyle.css"; // Import the shared CSS file

const RealTimeVoltageChart = ({ source }) => {
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
      console.log("recent data", recentData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateChartData = (recentData) => {
    const newEntry = {
      time: recentData.timestamp,
      ln_avg: recentData.ln_avg_voltage,
      rn: recentData.rn_voltage,
      yn: recentData.yn_voltage,
      bn: recentData.bn_voltage,
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

  const voltageChartData = {
    labels,
    datasets: [
      {
        label: "LN Avg Voltage",
        data: activeData.map((item) => item.ln_avg),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "RN Voltage",
        data: activeData.map((item) => item.rn),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "YN Voltage",
        data: activeData.map((item) => item.yn),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "BN Voltage",
        data: activeData.map((item) => item.bn),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
        time: {
          tooltipFormat: "ll HH:mm",
        },
      },
      y: {
        title: {
          display: true,
          text: "Voltage (V)",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  return (
    <div className="containerchart">
      <div className="chart-cont">
        <div className="title">Voltage Chart</div>
        <div className="legend-container-two">
          <div className="legend-item">
            <span className="legend-color-box v1" />
            <span>LN Avg Voltage</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box v2" />
            <span>RN Voltage</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box v3" />
            <span>YN Voltage</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box ln" />
            <span>BN Voltage</span>
          </div>
        </div>
        <Line data={voltageChartData} options={options} />
      </div>
      <div className="value-cont">
        <div className="value-heading">Voltage</div>
        <div className="current-value">Current Value</div>
        <div className="legend-container">
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v1" /> LN Avg Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ln_avg.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v2" />
              RN Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].rn.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v3" />
              YN Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].yn.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box ln" />
              BN Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].bn.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeVoltageChart;
