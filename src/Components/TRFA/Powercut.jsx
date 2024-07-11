import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PowercutChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => new Date(entry.timestamp)),
    datasets: [
      {
        label: "Power Status",
        data: data.map((entry) => entry.status),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
        stepped: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value === 1 ? "On" : "Off";
          },
        },
        title: {
          display: true,
          text: "Power Status (On/Off)",
        },
        grid: {
          display: false,
        },
      },
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "ll HH:mm",
        },
        title: {
          display: true,
          text: "Time",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw === 1 ? "Power On" : "Power Off";
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "auto" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

const Powercut = ({ data }) => {
  if (!data || !data.results || data.results.length === 0) {
    return <div>No data available</div>;
  }

  const formattedData = data.results.map((entry) => ({
    timestamp: entry.timestamp,
    status: entry.average_current > 0 ? 1 : 0,
  }));

  // Calculate power cut minutes
  let cutMinutes = 0;
  for (let i = 1; i < formattedData.length; i++) {
    if (formattedData[i].status === 0) {
      const previousTime = new Date(formattedData[i - 1].timestamp);
      const currentTime = new Date(formattedData[i].timestamp);
      cutMinutes += (currentTime - previousTime) / 60000; // Convert ms to minutes
    }
  }

  return (
    <div className="card shadow mb-4 h-100">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Power Status</h6>
        <div>Status: {cutMinutes} minutes of power cut</div>
      </div>
      <div className="card-body">
        <div>
          <PowercutChart data={formattedData} />
        </div>
      </div>
    </div>
  );
};

export default Powercut;
