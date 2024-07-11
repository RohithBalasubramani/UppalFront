import React, { useEffect, useState } from "react";
import EnergyMeter from "./Energy"; // Import your updated EnergyMeter component

const EnergyComp = ({ data }) => {
  const [selectedSource, setSelectedSource] = useState("DG1");
  const [totalEnergyUsed, setTotalEnergyUsed] = useState(0);
  const [totalCostSaved, setTotalCostSaved] = useState(0);
  const [percentageChange, setPercentageChange] = useState(-12.5); // Example value for demonstration
  const [curVal, setCurVal] = useState(0); // Example value for demonstration

  useEffect(() => {
    if (
      data &&
      data["recent data"] &&
      data["today"] &&
      data["resampled data"]
    ) {
      const today = data["today"];
      const resample = data["resampled data"];
      console.log("resample", resample);

      let totalEnergy = 0;
      let currentValue = 0;

      if (selectedSource === "DG1") {
        totalEnergy = resample.reduce(
          (sum, entry) => sum + (entry.DG1S12Reading_kw || 0),
          0
        );
        currentValue = today.DG1S12Reading_kw || 0;
      } else if (selectedSource === "DG2") {
        totalEnergy = resample.reduce(
          (sum, entry) => sum + (entry.DG2S3Reading_kw || 0),
          0
        );
        currentValue = today.DG2S3Reading_kw || 0;
      } else if (selectedSource === "EB") {
        totalEnergy = resample.reduce(
          (sum, entry) => sum + (entry.EBS10Reading_kw || 0),
          0
        );
        currentValue = today.EBS10Reading_kw || 0;
      }

      const costSaved = totalEnergy * 10; // Calculate cost in ₹

      setCurVal(currentValue);
      setTotalEnergyUsed(totalEnergy);
      setTotalCostSaved(costSaved);
    }
  }, [selectedSource, data]);

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  return (
    <>
      <div className="card shadow mb-4 h-100">
        <div>
          <div className="energy-widget-container">
            <div className="energy-stat">
              <h2>Energy Consumption</h2>
              <div className="energy-today">
                <h4 style={{ color: "#111111" }}>Today</h4>
                <h5>From 12am till now</h5>
                <p
                  className={`percentage-change ${
                    percentageChange > 0 ? "positive" : "negative"
                  }`}
                >
                  <i
                    className={`fas fa-caret-${
                      percentageChange > 0 ? "up" : "down"
                    }`}
                  ></i>
                  {Math.abs(percentageChange)} % compared to yesterday
                </p>
                <EnergyMeter value={curVal} />
                <p
                  style={{
                    textAlign: "left",
                    padding: "1vh",
                    marginLeft: "4vw",
                  }}
                >
                  {curVal.toLocaleString()} kWh
                </p>
              </div>
            </div>
            <div className="energy-savings">
              <select
                value={selectedSource}
                onChange={handleSourceChange}
                style={{ width: "5vw", marginRight: "0", marginLeft: "auto" }}
              >
                <option value="DG1">DG1</option>
                <option value="DG2">DG2</option>
                <option value="EB">EB</option>
              </select>
              <div className="energy-saved">
                <h3>Total Energy Used</h3>
                <p
                  className={`percentage-change ${
                    percentageChange > 0 ? "positive" : "negative"
                  }`}
                >
                  <i
                    className={`fas fa-caret-${
                      percentageChange > 0 ? "up" : "down"
                    }`}
                  ></i>
                  {Math.abs(percentageChange)} % compared to previous month
                </p>
                <p>{totalEnergyUsed.toLocaleString()} kWh</p>
              </div>
              <div className="cost-saved">
                <h3>Total Cost</h3>
                <p
                  className={`percentage-change ${
                    percentageChange > 0 ? "positive" : "negative"
                  }`}
                >
                  <i
                    className={`fas fa-caret-${
                      percentageChange > 0 ? "up" : "down"
                    }`}
                  ></i>
                  {Math.abs(percentageChange)} % compared to previous month
                </p>
                <p>₹{totalCostSaved.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnergyComp;
