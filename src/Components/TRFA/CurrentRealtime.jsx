import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const RealTimeCurrentChart = ({ source }) => {
  const [data, setData] = useState([]);
  const [powerStatus, setPowerStatus] = useState("Loading...");

  const getEndpoint = (source) => {
    switch (source) {
      case "eb":
        return "http://117.203.101.153/api/ebs10reading/";
      case "dg1":
        return "http://117.203.101.153/api/dg1s12reading/";
      case "dg2":
        return "http://117.203.101.153/api/dg2s3reading/";
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
      },
      {
        label: "Phase Y Current",
        data: activeData.map((item) => item.phaseY),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "Phase B Current",
        data: activeData.map((item) => item.phaseB),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
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
      },
      y: {
        title: {
          display: true,
          text: "Current (A)",
        },
      },
    },
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Current Chart</h6>
          <div>Status: {powerStatus}</div>
        </div>
        <div className="card-body">
          <Line data={currentChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeCurrentChart;
