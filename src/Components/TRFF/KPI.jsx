import {
  Bolt,
  ElectricBolt,
  ElectricMeter,
  ElectricalServices,
} from "@mui/icons-material";
import React from "react";

const KPI = ({ data }) => {
  if (
    !data ||
    !data["recent data"] ||
    !data["today"] ||
    !data["resampled data"]
  ) {
    return <div>No data available</div>;
  }

  const latestResampledData = data["resampled data"];
  const currentPower = latestResampledData[latestResampledData.length - 1].kw;
  const currentVoltage = data["recent data"].ln_voltage;
  const kwToday = data["today"].kw;

  // Calculate peak current and peak voltage from the resampled data
  const peakCurrent = Math.max(
    ...data["results"].map((item) => item.average_current)
  );
  const peakVoltage = Math.max(
    ...data["results"].map((item) => item.ln_voltage)
  );

  return (
    <div>
      {" "}
      {/*  <!-- Content Row --> */}
      <div className="row">
        {/*  <!-- Current Power Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Current Energy
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {currentPower} Kwh
                  </div>
                </div>
                <div className="col-auto">
                  <ElectricalServices
                    fontSize="large"
                    className="text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Current Voltage Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Energy Today
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {kwToday} Kwh
                  </div>
                </div>
                <div className="col-auto">
                  <Bolt fontSize="large" className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Peak Current Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Peak Current
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {peakCurrent} Amps
                  </div>
                </div>
                <div className="col-auto">
                  <ElectricBolt fontSize="large" className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Peak Voltage Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Peak Voltage
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {Number(peakVoltage.toFixed(2))} Volts
                  </div>
                </div>
                <div className="col-auto">
                  <ElectricMeter fontSize="large" className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Today's kWh Card Example --> */}
      </div>
    </div>
  );
};

export default KPI;
