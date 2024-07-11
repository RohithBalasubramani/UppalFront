import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";

const DonutChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data["recent data"]) {
      const recentData = data["recent data"];

      const newData = [];

      if (recentData.Skyd1Reading_kwh_eb > 0) {
        newData.push({
          name: "Skyde",
          y: recentData.Skyd1Reading_kwh_eb,
          link: "/skyd1",
        });
      }
      if (recentData.Utility1st2ndFS2Reading_kwh_eb > 0) {
        newData.push({
          name: "Utility",
          y: recentData.Utility1st2ndFS2Reading_kwh_eb,
          link: "/utility1st2ndfs2",
        });
      }
      if (recentData.SpareStation3Reading_kwh_eb > 0) {
        newData.push({
          name: "Spare S3",
          y: recentData.SpareStation3Reading_kwh_eb,
          link: "/sparestation3",
        });
      }
      if (recentData.ThirdFloorZohoS4Reading_kwh_eb > 0) {
        newData.push({
          name: "Zoho",
          y: recentData.ThirdFloorZohoS4Reading_kwh_eb,
          link: "/thirdfloorzohos4",
        });
      }
      if (recentData.SixthFloorS5Reading_kwh_eb > 0) {
        newData.push({
          name: "Spare S5",
          y: recentData.SixthFloorS5Reading_kwh_eb,
          link: "/sixthfloors5",
        });
      }
      if (recentData.SpareS6Reading_kwh_eb > 0) {
        newData.push({
          name: "Spare S6",
          y: recentData.SpareS6Reading_kwh_eb,
          link: "/spares6",
        });
      }
      if (recentData.SpareS7Reading_kwh_eb > 0) {
        newData.push({
          name: "Spare S7",
          y: recentData.SpareS7Reading_kwh_eb,
          link: "/spares7",
        });
      }
      if (recentData.ThirdFifthFloorKotakReading_kwh_eb > 0) {
        newData.push({
          name: "Third Fifth Floor Kotak Wh",
          y: recentData.ThirdFifthFloorKotakReading_kwh_eb,
          link: "/thirdfifthfloorkotak",
        });
      }

      setChartData(newData);
    } else {
      console.error("No recent data available");
    }
  }, [data]);

  if (chartData.length === 0) {
    return <div>Loading data...</div>;
  }

  const chartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Cumulative Wh",
    },
    plotOptions: {
      pie: {
        innerSize: "50%",
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return `${this.point.name}: ${this.point.percentage.toFixed(1)}%`;
          },
        },
        point: {
          events: {
            click: function (event) {
              navigate(event.point.options.link);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Wh",
        data: chartData,
        colors: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFCD56",
          "#C9CBCF",
        ],
      },
    ],
  };

  return (
    <div>
      <div className="card shadow mb-4">
        {/* <!-- Card Header - Dropdown --> */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            Production Componentwise
          </h6>
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
        {/* <!-- Card Body --> */}
        <div>
          <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
