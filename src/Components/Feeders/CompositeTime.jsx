import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-adapter-moment"; // Ensure to include moment adapter for time scale

const CompositeChart = ({ data }) => {
  console.log("insideData:", data);

  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  // Ensure resampledData is defined and has data
  const resampledData = data["resampled data"];
  console.log("resampled data: ", resampledData);
  if (!resampledData || resampledData.length === 0) {
    return <div>No resampled data available</div>;
  }

  // Calculating average kwh_eb
  const average =
    resampledData.reduce((sum, item) => sum + item.kwh_eb, 0) /
    resampledData.length;

  const chartData = {
    labels: resampledData.map((item) => item.timestamp),
    datasets: [
      {
        type: "line",
        label: "Total kWh",
        data: resampledData.map((item) => item.kwh_eb),
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Total kWh (Bar Chart)",
        data: resampledData.map((item) => item.kwh_eb),
        backgroundColor: resampledData.map((item) =>
          item.kwh_eb > average
            ? "rgba(255, 99, 132, 0.7)"
            : "rgba(75, 192, 192, 0.7)"
        ),
      },
    ],
  };

  const chartOptions = {
    aspectRatio: 4,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "MMM d, yyyy HH:mm", // Correct format string for date-fns
        },
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total kWh",
        },
      },
    },
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3" style={{ display: "flex" }}>
          <h6
            style={{ width: "10vw", display: "flex" }}
            className="m-0 font-weight-bold text-primary"
          >
            Composite Chart (Line & Bar)
          </h6>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          debitis.
        </div>
      </div>
    </div>
  );
};

export default CompositeChart;
