import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ChartAmf = ({ data, timeperiod, setTimeperiod }) => {
  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  const columnNames = Object.keys(data[0]);
  const labelsColumnNameIndex = columnNames.indexOf("date_time");

  if (labelsColumnNameIndex !== -1) {
    columnNames.splice(labelsColumnNameIndex, 1);
  }

  const labels = data.map((item) => item.date_time);

  // const datasets = columnNames.map((columnName) => {
  //   return {
  //     label: `${columnName} kWh`,
  //     data: data.map((item) => item[columnName]),
  //     backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
  //       Math.random() * 256
  //     )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
  //     borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
  //       Math.random() * 256
  //     )}, ${Math.floor(Math.random() * 256)}, 1)`,
  //     borderWidth: 1,
  //   };
  // });

  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    // Add more colors as needed
  ];

  const borderColors = [
    "rgba(255, 99, 132, 0.85)",
    "rgba(54, 162, 235, 0.85)",
    "rgba(255, 206, 86, 0.85)",
    "rgba(75, 192, 192, 0.85)",
    "rgba(153, 102, 255, 0.85)",
    // Add more border colors as needed
  ];

  const datasets = [
    {
      label: "act_pwr kWh",
      data: data.map((item) => item.act_pwr),
      backgroundColor: colors[0],
      borderColor: borderColors[0],
      borderWidth: 1,
      fill: true,
    },
    // Add more datasets if needed
  ];

  const findata = {
    labels: labels,
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
        // min: 0, // Set the minimum value for the y-axis
        // max: 40, // Set the maximum value for the y-axis
      },
    },
  };
  console.log(data);

  return (
    <div>
      {/* Area Chart */}
      <div className="card shadow mb-">
        <div className="card-header py-3" style={{ display: "flex" }}>
          <h6
            style={{ width: "10vw", display: "flex" }}
            className="m-0 font-weight-bold text-primary"
          >
            Area Chart
          </h6>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <Line
              // style={{ width: "70vw", height: "30vh" }}
              data={findata}
              options={options}
            />
          </div>
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          debitis.
        </div>
      </div>

      {/* Donut Chart */}
    </div>
  );
};

export default ChartAmf;
