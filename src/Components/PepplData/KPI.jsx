import {
  Bolt,
  ElectricBolt,
  ElectricMeter,
  ElectricalServices,
} from "@mui/icons-material";
import React from "react";

const KPI = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const latestData = data[0];
  const peakCurrent = Math.max(...data.map((item) => item.avg_curr));
  const peakVoltage = Math.max(...data.map((item) => item.ll_vltg));

  return (
    <div>
      {" "}
      {/*  <!-- Content Row --> */}
      <div className="row">
        {/*  <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Current Power
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {latestData.act_pwr}
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

        {/*  <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Current Voltage
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {latestData.avg_curr}
                  </div>
                </div>
                <div className="col-auto">
                  <ElectricMeter fontSize="large" className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Peak Current
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {peakCurrent}
                  </div>
                </div>
                <div className="col-auto">
                  <ElectricBolt fontSize="large" className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Pending Requests Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Peak Voltage
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {peakVoltage}
                  </div>
                </div>
                <div className="col-auto">
                  <ElectricMeter fontSize="large" className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPI;
