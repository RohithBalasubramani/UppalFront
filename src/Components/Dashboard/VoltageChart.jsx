import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

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
      },
      {
        label: "V2 Voltage",
        data: activeData.map((item) =>
          item.ebV2 > 0 ? item.ebV2 : item.dg1V2 > 0 ? item.dg1V2 : item.dg2V2
        ),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "V3 Voltage",
        data: activeData.map((item) =>
          item.ebV3 > 0 ? item.ebV3 : item.dg1V3 > 0 ? item.dg1V3 : item.dg2V3
        ),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
      {
        label: "LN Voltage",
        data: activeData.map((item) =>
          item.ebLN > 0 ? item.ebLN : item.dg1LN > 0 ? item.dg1LN : item.dg2LN
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
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
