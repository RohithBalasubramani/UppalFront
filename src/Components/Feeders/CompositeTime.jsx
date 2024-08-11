import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import dayjs from "dayjs";
import TimeBar from "../TRFF/TimePeriod"; // Ensure this path is correct
import DateRangeSelector from "../Dashboard/Daterangeselector";
import ToggleButtons from "../Dashboard/Togglesampling";
import "../Dashboard/StackedBarDGEB.css"; // Use the existing CSS file for styling

const CompositeChart = ({
  data,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeperiod,
  setTimeperiod,
  dateRange,
  setDateRange,
  backgroundColors = [], // Add backgroundColors prop if needed
}) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data && data["resampled data"]) {
      try {
        const resampledData = data["resampled data"];

        const average =
          resampledData.reduce((sum, item) => sum + item.kwh_eb, 0) /
          resampledData.length;

        const xAxisLabels = generateXAxisLabels(resampledData);

        const datasets = [
          {
            type: "line",
            label: "Total kWh",
            data: resampledData.map((item) => item.kwh_eb),
            fill: true,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            tension: 0.4,
            pointRadius: 1.5,
          },
          {
            type: "bar",
            label: "Total kWh (Bar Chart)",
            data: resampledData.map((item) => item.kwh_eb),
            backgroundColor: resampledData.map((item) =>
              item.kwh_eb > average ? "#DD3409" : "#6036D4"
            ),
          },
        ];

        setChartData({
          labels: xAxisLabels,
          datasets: datasets,
        });
      } catch (error) {
        console.error("Error processing data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("No resampled data available");
    }
  }, [data, timeperiod]);

  const generateXAxisLabels = (resampledData) => {
    if (!resampledData || resampledData.length === 0) return [];

    switch (timeperiod) {
      case "H":
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("MMM D, H:mm")
        );
      case "D":
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("MMM D, YYYY")
        );
      case "W":
        return resampledData.map((item, index) => {
          const weekNumber = dayjs(item.timestamp).week();
          return `Week ${weekNumber} - ${dayjs(item.timestamp).format("MMM")}`;
        });
      case "M":
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("MMM YYYY")
        );
      case "Q":
        return resampledData.map((item) => {
          const month = dayjs(item.timestamp).month();
          const quarter = Math.floor(month / 3) + 1;
          return `Q${quarter} ${dayjs(item.timestamp).format("YYYY")}`;
        });
      case "Y":
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("YYYY")
        );
      default:
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("MMM D, YYYY")
        );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="stacked-bar-container">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            <div className="title">Composite Chart (Line & Bar)</div>
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
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                    position: "bottom",
                    align: "start",
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
                },
                scales: {
                  x: {
                    stacked: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.05)",
                      borderDash: [8, 4],
                    },
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompositeChart;
