import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const StackedBarDGEB = ({ data }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data && data["resampled data"]) {
      try {
        const resampledData = data["resampled data"];

        // Define the keys to include manually
        const kwKeys = [
          "DG1S12Reading_kw",
          "EBS10Reading_kw",
          "DG2S3Reading_kw",
        ];

        const timestamps = resampledData.map((item) => {
          const date = new Date(item.timestamp);
          return date.toLocaleString();
        });

        const datasets = kwKeys.map((key) => ({
          label: key,
          data: resampledData.map((item) => item[key] || 0),
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.6)`,
        }));

        setChartData({
          labels: timestamps,
          datasets: datasets,
        });
      } catch (error) {
        console.error("Error processing data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("No resampled data available");
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Stacked Bar Chart
          </h6>
          {/* <div>Status:</div> */}
        </div>
        <div className="card-body">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Energy Consumption Over Time",
                },
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StackedBarDGEB;
