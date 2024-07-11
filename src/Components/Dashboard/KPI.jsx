import {
  BatteryChargingFull,
  BarChart,
  TrendingUp,
  Warning,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";

const KPI = ({ data }) => {
  const [kpiData, setKpiData] = useState({
    actpow: 0,
    total: 0,
    efficiency: 0,
    pendingAlerts: 18,
  });

  useEffect(() => {
    if (data && data["results"] && data["today"]) {
      const topResult = data["results"][0];
      const today = data["today"];

      // Calculate total consumption from resampled data
      const totalConsumption =
        (topResult.EBS10Reading_kwh || 0) +
        (topResult.DG1S12Reading_kwh || 0) +
        (topResult.DG2S3Reading_kwh || 0);

      // Calculate today's consumption from today data
      const todayConsumption =
        (today.EBS10Reading_kw || 0) +
        (today.DG1S12Reading_kw || 0) +
        (today.DG2S3Reading_kw || 0);

      const efficiency = 78; // Example efficiency calculation
      const pendingAlerts = 18; // Assuming alerts are part of recent data

      setKpiData({
        actpow: todayConsumption,
        total: totalConsumption / 1000, // Convert to MWh
        efficiency,
        pendingAlerts,
      });
    }
  }, [data]);

  const iconStyle = { fontSize: "2rem" };

  return (
    <>
      <div className="row">
        {/* Energy Consumption Today Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Energy Consumption Today
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {kpiData.actpow.toFixed(2)} kWh
                  </div>
                </div>
                <div className="col-auto">
                  <BatteryChargingFull
                    style={iconStyle}
                    className="fas fa fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Consumption Total Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Energy Consumption Total
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {kpiData.total.toFixed(2)} MWh
                  </div>
                </div>
                <div className="col-auto">
                  <BarChart
                    style={iconStyle}
                    className="fas fa fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Efficiency Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Load
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {kpiData.efficiency.toFixed(2)}%
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: `${kpiData.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <TrendingUp
                    style={iconStyle}
                    className="fas fa fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Alerts Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Alerts
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {kpiData.pendingAlerts}
                  </div>
                </div>
                <div className="col-auto">
                  <Warning
                    style={iconStyle}
                    className="fas fa fa-2x text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KPI;
