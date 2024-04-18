import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DonutChart from "./DonutOG";

const ChartsOG = ({ data, timeperiod, setTimeperiod }) => {
  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
  };

  console.log("OG Data", data);

  if (!data || data.length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  return (
    <div>
      {/* Donut Chart */}
      <div className="card shadow mb-">
        <div className="card-header py-3" style={{ display: "flex" }}>
          <h6 className="m-0 font-weight-bold text-primary">Donut Chart</h6>
          <div style={{ marginRight: "1vw", marginLeft: "auto" }}>
            <ToggleButtonGroup
              color="primary"
              value={timeperiod}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="D">Day</ToggleButton>
              <ToggleButton value="W">Week</ToggleButton>
              <ToggleButton value="M">Month</ToggleButton>
              <ToggleButton value="Q">Quartile</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <DonutChart data={data} />
          </div>
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          debitis.
        </div>
      </div>
    </div>
  );
};

export default ChartsOG;
