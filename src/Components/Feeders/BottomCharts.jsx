import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment"; // Ensure to include moment adapter for time scale
import dayjs from "dayjs";
import TimeBar from "../TRFF/TimePeriod";
import DateRangeSelector from "../Dashboard/Daterangeselector";
import ToggleButtons from "../Dashboard/Togglesampling";
import "../Dashboard/StackedBarDGEB.css"; // Use the existing CSS file for styling

const VoltageCurrent = ({
  data,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeperiod,
  setTimeperiod,
  dateRange,
  setDateRange,
}) => {
  const [voltageChartData, setVoltageChartData] = useState({});
  const [currentChartData, setCurrentChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenDatasets, setHiddenDatasets] = useState([]);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data["resampled data"]) {
      try {
        const resampledData = data["resampled data"];
        const xAxisLabels = generateXAxisLabels(resampledData);

        const voltageData = {
          labels: xAxisLabels,
          datasets: [
            {
              label: "Line Voltage",
              data: resampledData.map((item) => item.ln_avg_voltage),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2, // Increased thickness
              pointRadius: 3, // Increased point size
              tension: 0.3, // Adjusted line tension for a smoother curve
              hidden: hiddenDatasets.includes("Line Voltage"),
            },
          ],
        };

        const currentData = {
          labels: xAxisLabels,
          datasets: [
            {
              label: "Average Current",
              data: resampledData.map((item) => item.avg_current),
              fill: false,
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2, // Increased thickness
              pointRadius: 3, // Increased point size
              tension: 0.3, // Adjusted line tension for a smoother curve
              hidden: hiddenDatasets.includes("Average Current"),
            },
            {
              label: "Phase 1 Current",
              data: resampledData.map((item) => item.r_current),
              fill: false,
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2, // Increased thickness
              pointRadius: 3, // Increased point size
              tension: 0.3, // Adjusted line tension for a smoother curve
              hidden: hiddenDatasets.includes("Phase 1 Current"),
            },
            {
              label: "Phase 2 Current",
              data: resampledData.map((item) => item.y_current),
              fill: false,
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2, // Increased thickness
              pointRadius: 3, // Increased point size
              tension: 0.3, // Adjusted line tension for a smoother curve
              hidden: hiddenDatasets.includes("Phase 2 Current"),
            },
            {
              label: "Phase 3 Current",
              data: resampledData.map((item) => item.b_current),
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2, // Increased thickness
              pointRadius: 3, // Increased point size
              tension: 0.3, // Adjusted line tension for a smoother curve
              hidden: hiddenDatasets.includes("Phase 3 Current"),
            },
          ],
        };

        setVoltageChartData(voltageData);
        setCurrentChartData(currentData);
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
  }, [data, timeperiod, hiddenDatasets]);

  const generateXAxisLabels = (resampledData) => {
    if (!resampledData || resampledData.length === 0) return [];

    switch (timeperiod) {
      case "H":
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("MMM D, H:mm A")
        );
      case "D":
        return resampledData.map((item) =>
          dayjs(item.timestamp).format("MMM D, YYYY")
        );
      case "W":
        return resampledData.map((item) => {
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [8, 4],
        },
      },
      y: {
        stacked: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start", // Align legends to the start of the container
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
          onClick: (e, legendItem) => {
            const label = legendItem.text;
            setHiddenDatasets((prev) =>
              prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
            );
          },
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
              label += context.parsed.y.toFixed(2);
            }
            return label;
          },
        },
      },
    },
    events: ["click"],
    onClick: (evt, element) => {
      if (!element.length) return;

      const clickedDatasetIndex = element[0].datasetIndex;

      chartInstance.current.data.datasets.forEach((dataset, index) => {
        dataset.hidden = index !== clickedDatasetIndex;
      });

      chartInstance.current.update();
    },
  };

  return (
    <div className="stacked-bar-container">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row">
            <div className="title">Voltage and Current Charts</div>
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
            <div className="current-chart">
              <Line
                data={voltageChartData}
                options={options}
                ref={chartInstance}
              />
            </div>
            <div className="current-chart">
              <Line
                data={currentChartData}
                options={options}
                ref={chartInstance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoltageCurrent;
