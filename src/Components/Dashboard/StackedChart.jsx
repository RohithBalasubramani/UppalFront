import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const StackedBarChart = ({ data, start_date, end_date }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data && data["resampled data"]) {
      try {
        const resampledData = data["resampled data"];

        // Define the keys to include manually
        const kwKeys = [
          "Skyd1Reading_kw_eb",
          "Utility1st2ndFS2Reading_kw_eb",
          "SpareStation3Reading_kw_eb",
          "ThirdFloorZohoS4Reading_kw_eb",
          "SixthFloorS5Reading_kw_eb",
          "SpareS6Reading_kw_eb",
          "SpareS7Reading_kw_eb",
          "ThirdFifthFloorKotakReading_kw_eb",
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
                  text: "Total Energy Consumption Over Time",
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

export default StackedBarChart;
