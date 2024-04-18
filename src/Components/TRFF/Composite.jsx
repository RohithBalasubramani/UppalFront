import React from "react";
import { Bar, Line } from "react-chartjs-2";

const CompositeChart = ({ data }) => {
  console.log("insideData:", data);

  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  const labels = Object.keys(data);
  const totalKw = data[labels[0]].map((item) => ({
    date_time: item.date_time,
    totalKw: labels.reduce((sum, label) => {
      const endpointData = data[label];
      const match = endpointData.find((d) => d.date_time === item.date_time);
      // Safely accessing the 'kw' property only if 'match' is not undefined
      return sum + (match ? match.kw : 0);
    }, 0),
  }));

  const average =
    totalKw.reduce((sum, item) => sum + item.totalKw, 0) / totalKw.length;

  const chartData = {
    labels: totalKw.map((item) => item.date_time),
    datasets: [
      {
        type: "line",
        label: "Total KW",
        data: totalKw.map((item) => item.totalKw),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Total KW (Bar Chart)",
        data: totalKw.map((item) => item.totalKw),
        backgroundColor: totalKw.map((item) =>
          item.totalKw > average
            ? "rgba(255, 99, 132, 0.5)"
            : item.totalKw < average
            ? "rgba(75, 192, 192, 0.5)"
            : "rgba(255, 206, 86, 0.5)"
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
          tooltipFormat: "ll HH:mm",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total KW",
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
