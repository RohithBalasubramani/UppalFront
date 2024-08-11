import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment"; // Ensure to include moment adapter for time scale
import "../Dashboard/StackedBarDGEB.css"; // Use the existing CSS file for styling
import TimeBar from "../TRFF/TimePeriod";
import DateRangeSelector from "../Dashboard/Daterangeselector";
import ToggleButtons from "../Dashboard/Togglesampling";

const ChartAmf = ({
  data1,
  data2,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeperiod,
  setTimeperiod,
  dateRange,
  setDateRange,
}) => {
  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
  };

  if (!data1 || !data2 || data1.length === 0 || data2.length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  const labels1 = data1.map((item) => new Date(item.date_time));
  const labels2 = data2.map((item) => new Date(item.date_time));

  const datasets = [
    {
      label: "Endpoint 1",
      data: data1.map((item) => item.kw),
      borderColor: "rgba(255, 99, 132, 0.85)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderWidth: 1,
      fill: true,
    },
    {
      label: "Endpoint 2",
      data: data2.map((item) => item.kw),
      borderColor: "rgba(54, 162, 235, 0.85)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderWidth: 1,
      fill: true,
    },
  ];

  const findata = {
    labels: labels1, // Assuming both datasets have the same labels
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "MMM D, YYYY h:mm A", // Correct format string for date-fns
          displayFormats: {
            hour: "MMM D, YYYY h:mm A", // Format for the x-axis labels
          },
        },
        title: {
          display: true,
          text: "Timestamp",
          font: {
            family: "DM Sans",
            size: 14,
            weight: 500,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Light grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Total kWh",
          font: {
            family: "DM Sans",
            size: 14,
            weight: 500,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Light grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          padding: 20,
          font: {
            size: 14,
            family: "DM Sans",
          },
          usePointStyle: true,
          color: "#333",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2); // Format the value to 2 decimal places
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="stacked-bar-container">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            <div className="title">Line Chart</div>
            <div className="controls">
              <TimeBar
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                dateRange={dateRange}
                setDateRange={setDateRange}
                setTimeperiod={setTimeperiod}
                startDate={startDate}
                endDate={endDate}
              />
              <DateRangeSelector
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </div>
          </div>
          <div className="row">
            <ToggleButtons
              dateRange={dateRange}
              timeperiod={timeperiod}
              setTimeperiod={setTimeperiod}
            />
          </div>
          <div className="chart-content">
            <Line data={findata} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartAmf;
