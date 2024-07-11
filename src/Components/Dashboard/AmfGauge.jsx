import { Gauge, gaugeClasses } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AMFgauge = () => {
  const [ebUsage, setEbUsage] = useState(0);
  const [dgUsage, setDgUsage] = useState(0);
  const [ebTot, setEbtot] = useState(0);
  const [dgTot, setDgTot] = useState(0);

  const fetchData = async () => {
    try {
      const [ebResponse, dgResponse1, dgResponse2] = await Promise.all([
        axios.get("http://117.203.101.153/api/ebs10reading/"),
        axios.get("http://117.203.101.153/api/dg1s12reading/"),
        axios.get("http://117.203.101.153/api/dg2s3reading/"),
      ]);

      const ebKwh = ebResponse.data["recent data"].kwh;
      const dg1Kwh = dgResponse1.data["recent data"].kwh;
      const dg2Kwh = dgResponse2.data["recent data"].kwh;

      const totalKwh = ebKwh + dg1Kwh + dg2Kwh;
      if (totalKwh > 0) {
        setEbUsage((ebKwh / totalKwh) * 100);
        setDgUsage(((dg1Kwh + dg2Kwh) / totalKwh) * 100);
        setDgTot(dg1Kwh + dg2Kwh);
        setEbtot(ebKwh);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-4" style={{ height: "500px" }}>
          <div className="card shadow mb-4 h-50">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">EB Usage</h6>
              <div>Total: {ebTot} Kwh</div>
            </div>
            <div className="card-body">
              <Gauge
                width={140}
                height={100}
                startAngle={-130}
                endAngle={130}
                innerRadius="75%"
                outerRadius="110%"
                value={ebUsage}
                text={({ value }) => `${value.toFixed(2)} ${" %"}`}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#aeff00",
                  },
                })}
              />
              <div style={{ textAlign: "center", width: "100%" }}>EB Usage</div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4" style={{ height: "500px" }}>
          <div className="card shadow mb-4 h-50">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">DG Usage</h6>
              <div>Total: {dgTot} Kwh</div>
            </div>
            <div className="card-body">
              <Gauge
                width={140}
                height={100}
                startAngle={-130}
                endAngle={130}
                innerRadius="75%"
                outerRadius="110%"
                cornerRadius="50%"
                value={dgUsage}
                text={({ value }) => `${value.toFixed(2)} ${" %"}`}
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#ffd900",
                  },
                })}
              />
              <div style={{ textAlign: "center", width: "100%" }}>DG Usage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AMFgauge;
