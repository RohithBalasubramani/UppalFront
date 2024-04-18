import React from "react";
import { Line } from "react-chartjs-2";

const ChartAmf = ({ data1, data2, timeperiod, setTimeperiod }) => {
  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
  };

  if (!data1 || !data2 || data1.length === 0 || data2.length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  const labels1 = data1.map((item) => item.date_time);
  const labels2 = data2.map((item) => item.date_time);

  const datasets = [
    {
      label: "Endpoint 1",
      data: data1.map((item) => item.kw),
      borderColor: "rgba(255, 99, 132, 0.85)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Endpoint 2",
      data: data2.map((item) => item.kw),
      borderColor: "rgba(54, 162, 235, 0.85)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderWidth: 1,
      fill: true,
    },
  ];

  const findata = {
    labels: labels1, // Assuming both datasets have the same labels
    datasets: datasets,
  };

  const options = {
    aspectRatio: 4,
    responsive: true,
    scales: {
      x: {
        type: "time",
      },
      y: {
        title: {
          display: true,
          text: "mWh",
        },
      },
    },
  };

  return (
    <div>
      {/* Line Chart */}
      <div className="card shadow mb-">
        <div className="card-header py-3" style={{ display: "flex" }}>
          <h6
            style={{ width: "10vw", display: "flex" }}
            className="m-0 font-weight-bold text-primary"
          >
            Line Chart
          </h6>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <Line data={findata} options={options} />
          </div>
          <hr />
          {/* Additional content */}
        </div>
      </div>
    </div>
  );
};

export default ChartAmf;
