import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSankey from "highcharts/modules/sankey";

// Initialize Sankey module
HighchartsSankey(Highcharts);

const MySankeyChart = ({ data }) => {
  const [options, setOptions] = useState({
    title: {
      text: "Energy Flow Chart [kWh]",
    },
    series: [
      {
        keys: ["from", "to", "weight"],
        data: [],
        type: "sankey",
        name: "Energy Flow",
      },
    ],
  });

  useEffect(() => {
    if (data && data["recent data"]) {
      const item = data["recent data"];
      console.log("recent", item);

      if (item) {
        const processedData = [];

        // Push sources to the bus bar
        if (item.APFCS11Reading_kwh > 0) {
          processedData.push([
            "APFCS11Reading",
            "Bus Bar",
            item.APFCS11Reading_kwh,
          ]);
        }
        if (item.DG1S12Reading_kwh > 0) {
          processedData.push([
            "DG1S12Reading",
            "Bus Bar",
            item.DG1S12Reading_kwh,
          ]);
        }
        if (item.EBS10Reading_kwh > 0) {
          processedData.push([
            "EBS10Reading",
            "Bus Bar",
            item.EBS10Reading_kwh,
          ]);
        }
        if (item.DG2S3Reading_kwh > 0) {
          processedData.push([
            "DG2S3Reading",
            "Bus Bar",
            item.DG2S3Reading_kwh,
          ]);
        }
        if (item.SolarS13Reading_kwh > 0) {
          processedData.push([
            "SolarS13Reading",
            "Bus Bar",
            item.SolarS13Reading_kwh,
          ]);
        }

        // Distribute from the bus bar to feeders
        if (item.Skyd1Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "Skyd1Reading",
            item.Skyd1Reading_kwh_eb / 1000,
          ]);
        }
        if (item.Utility1st2ndFS2Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "Utility1st2ndFS2Reading",
            item.Utility1st2ndFS2Reading_kwh_eb / 1000,
          ]);
        }
        if (item.SpareStation3Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "SpareStation3Reading",
            item.SpareStation3Reading_kwh_eb / 1000,
          ]);
        }
        if (item.ThirdFloorZohoS4Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "ThirdFloorZohoS4Reading",
            item.ThirdFloorZohoS4Reading_kwh_eb / 1000,
          ]);
        }
        if (item.SixthFloorS5Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "SixthFloorS5Reading",
            item.SixthFloorS5Reading_kwh_eb / 1000,
          ]);
        }
        if (item.SpareS6Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "SpareS6Reading",
            item.SpareS6Reading_kwh_eb / 1000,
          ]);
        }
        if (item.SpareS7Reading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "SpareS7Reading",
            item.SpareS7Reading_kwh_eb / 1000,
          ]);
        }
        if (item.ThirdFifthFloorKotakReading_kwh_eb > 0) {
          processedData.push([
            "Bus Bar",
            "ThirdFifthFloorKotakReading",
            item.ThirdFifthFloorKotakReading_kwh_eb / 1000,
          ]);
        }

        setOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            {
              ...prevOptions.series[0],
              data: processedData,
            },
          ],
        }));
      } else {
        console.error("No recent data available");
      }
    } else {
      console.error("No recent data available");
    }
  }, [data]);

  return (
    <div className="col-lg-12 mb-4">
      {/* <!-- Energy Flow Chart --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Energy Flow Chart
          </h6>
        </div>
        <div className="card-body">
          <div className="text-center">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
      {/* <!-- Additional Section --> */}
    </div>
  );
};

export default MySankeyChart;
