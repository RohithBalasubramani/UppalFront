import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./realtimestyle.css"; // Import the shared CSS file

const RealTimeCurrentChart = () => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");

  const fetchData = async () => {
    const currentTime = new Date().toISOString();
    const params = {
      start_date_time: new Date(Date.now() - 60000).toISOString(), // last one minute
      end_date_time: currentTime,
      resample_period: "T", // per minute
    };
    try {
      const [ebResponse, dg1Response, dg2Response] = await Promise.all([
        axios.get("https://www.therion.co.in/api/ebs10reading/", { params }),
        axios.get("https://www.therion.co.in/api/dg1s12reading/", { params }),
        axios.get("https://www.therion.co.in/api/dg2s3reading/", { params }),
      ]);

      const ebRecent = ebResponse.data["recent data"];
      const dg1Recent = dg1Response.data["recent data"];
      const dg2Recent = dg2Response.data["recent data"];

      updateChartData(ebRecent, dg1Recent, dg2Recent);
      updatePowerStatus(ebRecent, dg1Recent, dg2Recent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateChartData = (ebRecent, dg1Recent, dg2Recent) => {
    const newEntry = {
      time: ebRecent.timestamp || dg1Recent.timestamp || dg2Recent.timestamp,
      ebKw: ebRecent.kw,
      ebR: ebRecent.phase_1_current,
      ebY: ebRecent.phase_2_current,
      ebB: ebRecent.phase_3_current,
      dg1Kw: dg1Recent.kw,
      dg1R: dg1Recent.phase_1_current,
      dg1Y: dg1Recent.phase_2_current,
      dg1B: dg1Recent.phase_3_current,
      dg2Kw: dg2Recent.kw,
      dg2R: dg2Recent.phase_1_current,
      dg2Y: dg2Recent.phase_2_current,
      dg2B: dg2Recent.phase_3_current,
    };

    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData.length > 15
        ? updatedData.slice(updatedData.length - 15)
        : updatedData;
    });
  };

  const updatePowerStatus = (ebRecent, dg1Recent, dg2Recent) => {
    if (
      ebRecent.phase_1_current > 0 ||
      ebRecent.phase_2_current > 0 ||
      ebRecent.phase_3_current > 0
    ) {
      setPowerStatus("Running on EB");
    } else if (
      dg1Recent.phase_1_current > 0 ||
      dg1Recent.phase_2_current > 0 ||
      dg1Recent.phase_3_current > 0
    ) {
      setPowerStatus("Running on DG1");
    } else if (
      dg2Recent.phase_1_current > 0 ||
      dg2Recent.phase_2_current > 0 ||
      dg2Recent.phase_3_current > 0
    ) {
      setPowerStatus("Running on DG2");
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

  const activeData = data
    .filter(
      (item) =>
        item.ebR > 0 ||
        item.ebY > 0 ||
        item.ebB > 0 ||
        item.dg1R > 0 ||
        item.dg1Y > 0 ||
        item.dg1B > 0 ||
        item.dg2R > 0 ||
        item.dg2Y > 0 ||
        item.dg2B > 0
    )
    .slice(-15);

  const labels = activeData.map((item) => item.time);

  const currentChartData = {
    labels,
    datasets: [
      {
        label: "Phase R Current",
        data: activeData.map((item) =>
          item.ebR > 0 ? item.ebR : item.dg1R > 0 ? item.dg1R : item.dg2R
        ),
        borderColor: "#D33030",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "Phase Y Current",
        data: activeData.map((item) =>
          item.ebY > 0 ? item.ebY : item.dg1Y > 0 ? item.dg1Y : item.dg2Y
        ),
        borderColor: "#FFB319",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "Phase B Current",
        data: activeData.map((item) =>
          item.ebB > 0 ? item.ebB : item.dg1B > 0 ? item.dg1B : item.dg2B
        ),
        borderColor: "#017EF3",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
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
        display: false, // Hide default legend
      },
    },
  };

  return (
    <div className="containerchart">
      <div className="chart-cont">
        <div className="title">Current</div>
        <div className="legend-container-two">
          <div className="legend-item">
            <span className="legend-color-box v1" />
            <span>R phase</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box v2" />
            <span>Y phase</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box v3" />
            <span>B phase</span>
          </div>
        </div>
        <div className="chart-size">
          <Line data={currentChartData} options={options} />
        </div>
      </div>
      <div className="value-cont">
        <div className="value-heading">Current</div>
        <div className="current-value">Current Value</div>
        <div className="legend-container">
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v1" /> R phase
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebR.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">A</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v2" />Y phase
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebY.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">A</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v3" />B phase
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebB.toFixed(2)
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
