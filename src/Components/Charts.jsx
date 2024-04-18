import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Charts = ({ data, timeperiod, setTimeperiod }) => {
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

  const datasets = columnNames.map((columnName) => {
    return {
      label: `${columnName} kWh`,
      data: data.map((item) => item[columnName]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      borderWidth: 1,
    };
  });

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
      },
    },
  };

  return (
    <div>
      {/* Area Chart */}
      <div className="card shadow mb-">
        <div className="card-header py-3" style={{ display: "flex" }}>
          <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
          <div style={{ marginRight: "1vw", marginLeft: "auto" }}>
            <ToggleButtonGroup
              color="primary"
              value={timeperiod}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{}}
            >
              {/* <ToggleButton value="">Minute</ToggleButton> */}
              <ToggleButton value="H">Hour</ToggleButton>
              <ToggleButton value="D">Day</ToggleButton>
              <ToggleButton value="W">Week</ToggleButton>
              <ToggleButton value="M">Month</ToggleButton>
              <ToggleButton value="Q">Quartile</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <Line data={findata} options={options} />
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

export default Charts;
