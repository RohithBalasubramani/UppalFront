import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const RealTimeVoltageChart = ({ source }) => {
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
      },
      {
        label: "RN Voltage",
        data: activeData.map((item) => item.rn),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "YN Voltage",
        data: activeData.map((item) => item.yn),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
      {
        label: "BN Voltage",
        data: activeData.map((item) => item.bn),
        borderColor: "rgba(75, 192, 192, 1)",
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
          text: "Voltage (V)",
        },
      },
    },
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Voltage Chart</h6>
          <div>Status: {powerStatus}</div>
        </div>
        <div className="card-body">
          <Line data={voltageChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeVoltageChart;
