import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment"; // Ensure to include moment adapter for time scale

const VoltageCurrent = ({ data }) => {
  // Declare chartInstance ref outside of the conditional statement
  const chartInstance = React.useRef(null);

  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  const labels = data["resampled data"].map((item) => item.timestamp);
  console.log("Bottom Chart: ", data);

  // Voltage chart data
  const voltageChartData = {
    labels: labels,
    datasets: [
      {
        label: "Line Voltage",
        data: data["resampled data"].map((item) => item.ln_avg_voltage),
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
        data: data["resampled data"].map((item) => item.avg_current),
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
      {
        label: "Phase 1 Current",
        data: data["resampled data"].map((item) => item.r_current),
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Phase 2 Current",
        data: data["resampled data"].map((item) => item.y_current),
        fill: false,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Phase 3 Current",
        data: data["resampled data"].map((item) => item.b_current),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "ll HH:mm", // Correct format string
        },
        title: {
          display: true,
          text: "Timestamp",
        },
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
    onClick: (evt, element, chart) => {
      if (!element.length) return; // If no label is clicked, return

      const clickedDatasetIndex = element[0].datasetIndex;

      // Show only the clicked dataset and hide others
      chart.data.datasets.forEach((dataset, index) => {
        dataset.hidden = index !== clickedDatasetIndex;
      });

      // Update the chart with modified data
      chart.update();
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

export default VoltageCurrent;
