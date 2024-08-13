import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PowerOutageChart = () => {
  const chartRef = useRef(null);

  const labels = Array.from(
    { length: 25 },
    (_, i) => `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? "am" : "pm"}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Power On",
        data: Array(25).fill(1),
        backgroundColor: "rgba(0, 200, 0, 0.2)",
        borderWidth: 0,
        barThickness: 50,
        borderRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        grid: {
          display: true, // Display grid lines
          color: "#e0e0e0", // Light gray color for the grid lines
          lineWidth: 1, // Thickness of the grid lines
        },
        stacked: true,
      },
      y: {
        display: false,
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    indexAxis: "y",
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const xScale = chart.scales.x;

      if (xScale) {
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;

        const powerCutIndexes = [6, 8, 10, 13]; // Power cut times at 6am, 8am, 10am, 1pm

        powerCutIndexes.forEach((index) => {
          const x = xScale.getPixelForValue(index);

          ctx.beginPath();
          ctx.moveTo(x, chart.chartArea.top);
          ctx.lineTo(x, chart.chartArea.bottom);
          ctx.stroke();
        });

        ctx.restore();
      }
    }
  }, [data]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <div style={{ height: "60px", position: "relative" }}>
        <Bar ref={chartRef} data={data} options={options} height={60} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          fontSize: "14px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "15px" }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: "rgba(0, 200, 0, 1)",
              marginRight: "5px",
            }}
          ></span>
          On
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              marginRight: "5px",
            }}
          ></span>
          Off
        </div>
      </div>
    </div>
  );
};

export default PowerOutageChart;
