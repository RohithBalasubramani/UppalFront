import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./realtimestyle.css"; // Import the CSS file

const RealTimeVoltageChart = () => {
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
      ebV1: ebRecent.v1_voltage,
      ebV2: ebRecent.v2_voltage,
      ebV3: ebRecent.v3_voltage,
      ebLN: ebRecent.ln_voltage,
      dg1V1: dg1Recent.v1_voltage,
      dg1V2: dg1Recent.v2_voltage,
      dg1V3: dg1Recent.v3_voltage,
      dg1LN: dg1Recent.ln_voltage,
      dg2V1: dg2Recent.v1_voltage,
      dg2V2: dg2Recent.v2_voltage,
      dg2V3: dg2Recent.v3_voltage,
      dg2LN: dg2Recent.ln_voltage,
    };

    setData((prevData) => {
      const updatedData = [...prevData, newEntry];
      return updatedData.length > 15
        ? updatedData.slice(updatedData.length - 15)
        : updatedData;
    });
  };

  const updatePowerStatus = (ebRecent, dg1Recent, dg2Recent) => {
    if (ebRecent.average_current > 0) {
      setPowerStatus("Running on EB");
    } else if (dg1Recent.average_current > 0) {
      setPowerStatus("Running on DG1");
    } else if (dg2Recent.average_current > 0) {
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
        item.ebV1 > 0 ||
        item.ebV2 > 0 ||
        item.ebV3 > 0 ||
        item.ebLN > 0 ||
        item.dg1V1 > 0 ||
        item.dg1V2 > 0 ||
        item.dg1V3 > 0 ||
        item.dg1LN > 0 ||
        item.dg2V1 > 0 ||
        item.dg2V2 > 0 ||
        item.dg2V3 > 0 ||
        item.dg2LN > 0
    )
    .slice(-15);

  const labels = activeData.map((item) => item.time);

  const voltageChartData = {
    labels,
    datasets: [
      {
        label: "V1 Voltage",
        data: activeData.map((item) =>
          item.ebV1 > 0 ? item.ebV1 : item.dg1V1 > 0 ? item.dg1V1 : item.dg2V1
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "V2 Voltage",
        data: activeData.map((item) =>
          item.ebV2 > 0 ? item.ebV2 : item.dg1V2 > 0 ? item.dg1V2 : item.dg2V2
        ),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "V3 Voltage",
        data: activeData.map((item) =>
          item.ebV3 > 0 ? item.ebV3 : item.dg1V3 > 0 ? item.dg1V3 : item.dg2V3
        ),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4, // Smooth line
      },
      {
        label: "LN Voltage",
        data: activeData.map((item) =>
          item.ebLN > 0 ? item.ebLN : item.dg1LN > 0 ? item.dg1LN : item.dg2LN
        ),
        borderColor: "rgba(75, 192, 192, 1)",
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
        <div className="title">Voltage</div>
        <div className="legend-container-two">
          <div className="legend-item">
            <span className="legend-color-box v1" />
            <span>V1 Voltage</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box v2" />
            <span>V2 Voltage</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box v3" />
            <span>V3 Voltage</span>
          </div>
          <div className="legend-item">
            <span className="legend-color-box ln" />
            <span>LN Voltage</span>
          </div>
        </div>
        <div className="chart-size">
          <Line data={voltageChartData} options={options} />
        </div>
      </div>
      <div className="value-cont">
        <div className="value-heading">Voltage</div>
        <div className="current-value">Current Value</div>
        <div className="legend-container">
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v1" /> V1 Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebV1.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v2" />
              V2 Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebV2.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box v3" />
              V3 Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebV3.toFixed(2)
                : "0.00"}{" "}
              <span className="value-span">V</span>
            </div>
          </div>
          <div className="legend-item-two">
            <div className="value-name">
              <span className="legend-color-box ln" />
              LN Voltage
            </div>
            <div className="value">
              {activeData.length > 0
                ? activeData[activeData.length - 1].ebLN.toFixed(2)
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
