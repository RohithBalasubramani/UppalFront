import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const StackedBarChart = ({ startDate, endDate, timePeriod }) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const params = {
      start_date_time: startDate.toISOString(),
      end_date_time: endDate.toISOString(),
      resample_period: timePeriod,
    };

    try {
      const [ebResponse, dg1Response, dg2Response] = await Promise.all([
        axios.get("https://www.therion.co.in/api/ebs10reading/", { params }),
        axios.get("https://www.therion.co.in/api/dg1s12reading/", { params }),
        axios.get("https://www.therion.co.in/api/dg2s3reading/", { params }),
      ]);

      console.log("ebResponse", ebResponse.data);
      console.log("dg1Response", dg1Response.data);
      console.log("dg2Response", dg2Response.data);

      const ebData = ebResponse.data.resampleddata;
      const dg1Data = dg1Response.data.results;
      const dg2Data = dg2Response.data.results;
      console.log("ebData", ebData);
      const datatest = ebData.kw;

      const combinedData = [];

      // Iterate through the timestamps to sum up kw values
      ebData.forEach((ebItem, index) => {
        const timestamp = ebItem.timestamp;
        const ebKw = ebItem.kw || 0;
        const dg1Kw = dg1Data[index]?.kw || 0;
        const dg2Kw = dg2Data[index]?.kw || 0;

        const existingIndex = combinedData.findIndex(
          (item) => item.time === timestamp
        );

        if (existingIndex !== -1) {
          combinedData[existingIndex].ebKw += ebKw;
          combinedData[existingIndex].dg1Kw += dg1Kw;
          combinedData[existingIndex].dg2Kw += dg2Kw;
        } else {
          combinedData.push({
            time: timestamp,
            ebKw: ebKw,
            dg1Kw: dg1Kw,
            dg2Kw: dg2Kw,
          });
        }
      });

      const labels = combinedData.map((item) => item.time);

      const ebKwData = combinedData.map((item) => item.ebKw);
      console.log("ebKwData");
      const dg1KwData = combinedData.map((item) => item.dg1Kw);
      const dg2KwData = combinedData.map((item) => item.dg2Kw);

      setChartData({
        labels,
        datasets: [
          {
            label: "EB Usage (kW)",
            backgroundColor: "rgba(75,192,192,0.6)",
            data: ebKwData,
          },
          {
            label: "DG1 Usage (kW)",
            backgroundColor: "rgba(255,99,132,0.6)",
            data: dg1KwData,
          },
          {
            label: "DG2 Usage (kW)",
            backgroundColor: "rgba(54,162,235,0.6)",
            data: dg2KwData,
          },
        ],
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate && timePeriod) {
      fetchData();
    }
  }, [startDate, endDate, timePeriod]);

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        type: "time",
        time: {
          tooltipFormat: "ll HH:mm",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Usage (kW)",
        },
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return chartData ? (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Historic Usage</h6>
      </div>
      <div className="card-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  ) : null;
};

export default StackedBarChart;
