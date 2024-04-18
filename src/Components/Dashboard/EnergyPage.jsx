import React from "react";
import "./EnergyComp.css"; // Assuming you have a separate CSS file for styling
import EnergyMeter from "./Energy"; // Import your EnergyMeter component

const EnergyComp = () => {
  // Static values for the demonstration
  const todayEnergy = {
    kWh: 2952,
    percentageChange: 82, // Positive value for increase
  };

  const monthEnergy = {
    kWh: 159654,
    percentageChange: -12.5, // Negative value for decrease
  };

  const totalEnergySaved = 38500000; // in kWh
  const totalCostSaved = 1490000; // in dollars

  return (
    <>
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
          <div className="energy-widget-container">
            <div className="energy-stat">
              <h2>Energy Consumption</h2>
              <div className="energy-today">
                <h4 style={{ color: "#111111" }}>Today</h4>
                <h5>From 7AM till now</h5>
                <p
                  className={`percentage-change ${
                    todayEnergy.percentageChange > 0 ? "positive" : "negative"
                  }`}
                >
                  <i
                    className={`fas fa-caret-${
                      todayEnergy.percentageChange > 0 ? "up" : "down"
                    }`}
                  ></i>
                  {Math.abs(todayEnergy.percentageChange)} % compared to
                  yesterday
                </p>
                {/* Include the EnergyMeter component with the value prop */}
                <EnergyMeter value={todayEnergy.percentageChange} />
                <p
                  style={{
                    textAlign: "left",
                    padding: "1vh",
                    marginLeft: "4vw",
                  }}
                >
                  {todayEnergy.kWh.toLocaleString()} kWh
                </p>
              </div>
              {/* <div className="energy-month">
          <h3>This month</h3>
          <h4>Till now</h4>
          <p>{monthEnergy.kWh.toLocaleString()} kWh</p>
          <p
            className={`percentage-change ${
              monthEnergy.percentageChange > 0 ? "positive" : "negative"
            }`}
          >
            <i
              className={`fas fa-caret-${
                monthEnergy.percentageChange > 0 ? "up" : "down"
              }`}
            ></i>
            {Math.abs(monthEnergy.percentageChange)} % compared to previous
            month
          </p>
          {/* Include the EnergyMeter component with the value prop */}
              {/* <EnergyMeter value={monthEnergy.percentageChange} /> */}
              {/* </div> */}
            </div>
            <div className="energy-savings">
              <div className="energy-saved">
                <h3>Total Energy Saved</h3>
                <p
                  className={`percentage-change ${
                    monthEnergy.percentageChange > 0 ? "positive" : "negative"
                  }`}
                >
                  <i
                    className={`fas fa-caret-${
                      monthEnergy.percentageChange > 0 ? "up" : "down"
                    }`}
                  ></i>
                  {Math.abs(monthEnergy.percentageChange)} % compared to
                  previous month
                </p>

                <p>{totalEnergySaved.toLocaleString()} kWh</p>
                {/* <EnergyMeter value={totalEnergySaved} maxValue={500000} /> */}
              </div>
              <div className="cost-saved">
                <h3>Total Cost Saved</h3>
                <p
                  className={`percentage-change ${
                    monthEnergy.percentageChange > 0 ? "positive" : "negative"
                  }`}
                >
                  <i
                    className={`fas fa-caret-${
                      monthEnergy.percentageChange > 0 ? "up" : "down"
                    }`}
                  ></i>
                  {Math.abs(monthEnergy.percentageChange)} % compared to
                  previous month
                </p>
                <p>₹{totalCostSaved.toLocaleString()}</p>
                {/* <EnergyMeter value={totalCostSaved} maxValue={200000} /> */}
              </div>
            </div>
          </div>
        </div>
        <hr />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, debitis.
      </div>
    </>
  );
};

export default EnergyComp;
