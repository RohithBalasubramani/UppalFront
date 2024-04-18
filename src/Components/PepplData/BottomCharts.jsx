import React from "react";
import { Line } from "react-chartjs-2";

const ChartAmfBottom = ({ data }) => {
  // Declare chartInstance ref outside of the conditional statement
  const chartInstance = React.useRef(null);

  if (!data || data.length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  const labels = data.map((item) => item.date_time);

  // Voltage chart data
  const voltageChartData = {
    labels: labels,
    datasets: [
      {
        label: "Line to Line Voltage",
        data: data.map((item) => item.ll_vltg),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  // Current chart data
  const currentChartData = {
    labels: labels,
    datasets: [
      {
        label: "Average Current",
        data: data.map((item) => item.avg_curr),
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
      {
        label: "Phase R Current",
        data: data.map((item) => item.r_curr),
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Phase Y Current",
        data: data.map((item) => item.y_curr),
        fill: false,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Phase B Current",
        data: data.map((item) => item.b_curr),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for charts
  // Options for charts
  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        min: 0,
      },
    },
    events: ["click"],
    onClick: (evt, element, chartInstance) => {
      if (!element.length) return; // If no label is clicked, return

      const clickedDatasetIndex = element[0].datasetIndex;

      // Show only the clicked dataset and hide others
      chartInstance.data.datasets.forEach((dataset, index) => {
        dataset.hidden = index !== clickedDatasetIndex;
      });

      // Update the chart with modified data
      chartInstance.update();
    },
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Voltage Chart
              </h6>
            </div>
            <div className="card-body">
              <Line
                data={voltageChartData}
                options={options}
                ref={chartInstance}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Current Chart
              </h6>
            </div>
            <div className="card-body">
              <Line
                data={currentChartData}
                options={options}
                ref={chartInstance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartAmfBottom;
