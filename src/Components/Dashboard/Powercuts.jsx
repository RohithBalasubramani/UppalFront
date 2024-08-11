import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PowercutChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => new Date(entry.timestamp)),
    datasets: [
      {
        label: "Power Cuts",
        data: data.map((entry) => (entry.status === 0 ? 1 : null)),
        backgroundColor: "red",
        barThickness: 5,
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
        display: false, // Hide y-axis
      },
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "HH:mm",
          displayFormats: {
            hour: "HH:mm",
          },
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
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function () {
            return "Power Cut";
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

const Powercut = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0); // Start of the day
    const endDate = new Date(); // Current time

    try {
      const response = await axios.get(
        "https://www.therion.co.in/api/ebs10reading/",
        {
          params: {
            start_date_time: startDate.toISOString(),
            end_date_time: endDate.toISOString(),
            resample_period: "1min",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <div>No data available</div>;
  }

  const formattedData = data.results.map((entry) => ({
    timestamp: entry.timestamp,
    status: entry.average_current > 0 ? 1 : 0,
  }));

  // Count the number of power cuts
  const powerCuts = formattedData.filter((entry) => entry.status === 0).length;

  return (
    <div className="card shadow mb-4 h-100">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Power Outage - Today
        </h6>
        <div className="d-flex justify-content-between">
          <div>
            <div>No of Power cuts</div>
            <div>{powerCuts}</div>
          </div>
          {/* Placeholder for total power cut time if needed */}
          <div>
            <div>Total power cut time</div>
            <div>{/* Calculate and display total time */}</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <PowercutChart data={formattedData} />
      </div>
    </div>
  );
};

export default Powercut;
