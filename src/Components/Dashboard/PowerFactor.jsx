import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import axios from "axios";
import "./PowerFactorGauge.css"; // Adjust the path as needed

highchartsMore(Highcharts);
solidGauge(Highcharts);

const PowerFactorGauge = () => {
  const [powerFactor, setPowerFactor] = useState(0.9); // Initial dummy data
  const [powerQuality, setPowerQuality] = useState("Loading...");

  const fetchPowerFactor = async () => {
    try {
      const response = await axios.get(
        "https://www.therion.co.in/api/ebs10reading/"
      );
      const powerFactorValue = response.data["recent data"].power_factor;
      setPowerFactor(powerFactorValue);

      if (powerFactorValue >= 0.95) {
        setPowerQuality("Good");
      } else if (powerFactorValue >= 0.85) {
        setPowerQuality("Average");
      } else {
        setPowerQuality("Bad");
      }
    } catch (error) {
      console.error("Error fetching power factor data:", error);
    }
  };

  useEffect(() => {
    fetchPowerFactor();
    const interval = setInterval(fetchPowerFactor, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "80%",
    },
    title: {
      text: null,
    },
    pane: {
      startAngle: -110,
      endAngle: 110,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },
    yAxis: {
      min: 0,
      max: 1,
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 0,
          to: 1,
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
            stops: [
              [0, "#DF5353"], // Red
              [0.85, "#DDDF0D"], // Yellow
              [1, "#55BF3B"], // Green
            ],
          },
          thickness: 20,
        },
      ],
    },
    series: [
      {
        name: "Power Factor",
        data: [powerFactor],
        tooltip: {
          valueSuffix: "",
        },
        dataLabels: {
          format: "{y}",
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "16px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  };

  return (
    <div className="card shadow mb-4 h-100">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Power Factor</h6>
        <div>Power Quality: {powerQuality}</div>
      </div>
      <div className="card-body">
        <div className="highcharts-figure">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PowerFactorGauge;
