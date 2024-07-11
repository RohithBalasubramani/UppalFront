import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

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
        axios.get("http://117.203.101.153/api/ebs10reading/", { params }),
        axios.get("http://117.203.101.153/api/dg1s12reading/", { params }),
        axios.get("http://117.203.101.153/api/dg2s3reading/", { params }),
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
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
      {
        label: "Phase Y Current",
        data: activeData.map((item) =>
          item.ebY > 0 ? item.ebY : item.dg1Y > 0 ? item.dg1Y : item.dg2Y
        ),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "Phase B Current",
        data: activeData.map((item) =>
          item.ebB > 0 ? item.ebB : item.dg1B > 0 ? item.dg1B : item.dg2B
        ),
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
    ],
  };

  // const maxcur = Math.max(...activeData.map((item) => item.phase_2_current), 0);
  // const mincur = Math.min(...activeData.map((item) => item.phase_2_current), 0);

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        title: {
          display: true,
          text: "Current (A)",
        },
        // min: mincur - 40, // dynamically adjust the scale
        // max: maxcur + 60,
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
