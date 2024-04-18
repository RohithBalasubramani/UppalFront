import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

const ChartsAno = ({ data, totalDataset }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>; // or handle this case as needed
  }

  const filteredData = data.map(({ id, reason, ...rest }) => rest);

  const columnNames = Object.keys(filteredData[0]);
  const labelsColumnNameIndex = columnNames.indexOf("date_time");

  if (labelsColumnNameIndex !== -1) {
    columnNames.splice(labelsColumnNameIndex, 1);
  }

  const labels = filteredData.map((item) => item.date_time);

  const datasets = columnNames.map((columnName) => {
    return {
      label: `${columnName} kWh`,
      data: filteredData.map((item) => item[columnName]),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      borderWidth: 1,
    };
  });

  const findata = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        title: {
          display: true,
          text: "mWh",
        },
      },
    },
  };

  // Count occurrences of reasons in anomaly data
  const anomalyReasons = data.map((item) => item.reason);
  const uniqueReasons = [...new Set(anomalyReasons)]; // Get unique reasons
  const reasonsCount = {};
  uniqueReasons.forEach((reason) => {
    reasonsCount[reason] = anomalyReasons.filter((r) => r === reason).length;
  });

  // Total count of anomalies
  // Total count of anomalies
  const totalAnomalies = data.length;

  // Calculate count of non-anomalies
  const totalNonAnomalies = totalDataset.count - data.length;
  reasonsCount["Not Anomaly"] = totalNonAnomalies;
  // console.log(reasonsCount);
  // console.log(totalDataset.count);
  // console.log(data.length);

  const donutChartData = {
    labels: Object.keys(reasonsCount),
    datasets: [
      {
        label: "Anomalies by Reason",
        data: Object.values(reasonsCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* Area Chart */}
      {/*  <!-- Content Row --> */}

      <div className="row">
        {/*   <!-- Area Chart --> */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            {/*  <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Line Chart</h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            {/*  <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Line data={findata} options={options} />
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Pie Chart --> */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            {/*  <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Pie Chart</h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            {/*  <!-- Card Body --> */}
            <div className="card-body">
              <Doughnut data={donutChartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Donut Chart */}
    </div>
  );
};

export default ChartsAno;
