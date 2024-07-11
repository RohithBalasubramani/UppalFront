import React, { useState, useEffect } from "react";
import DonutChart from "./Dashboard/DonutDash";
import axios from "axios";
import CompositeChart from "./Dashboard/Composite";
import ChartStack from "./Dashboard/StackedChart";
import MySankeyChart from "./Dashboard/Sankee";
import DashboardLoader from "./Dashboard/Loading";
import EnergyComp from "./Dashboard/EnergyPage";
import WeatherWidget from "./Dashboard/Weather";
import KPI from "./Dashboard/KPI";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import AI from "./Dashboard/AI";
import RealTimeCurrentChart from "./Dashboard/CurrentChart";
import PowerFactorGauge from "./Dashboard/PowerFactor";
import styled from "styled-components";
import AMFgauge from "./Dashboard/AmfGauge";
import RealTimeVoltageChart from "./Dashboard/VoltageChart";
import BottomTimeSeries from "./Dashboard/TimeseriesDash";

const ContCurrent = styled.div`
  width: 100%;
  display: flex;
`;

const CurDiv = styled.div`
  flex: 7;
`;

const PFDiv = styled.div`
  flex: 3;
`;

const DashboardPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("W");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [tablesData, setTablesData] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, timeperiod]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const endpoint = "https://www.therion.co.in/analytics/api/timeserieslog/";
      const response = await axios.get(endpoint, {
        params: {
          start_date_time: startDate
            ? startDate.toISOString()
            : "2024-07-07T14:00:00",
          end_date_time: endDate
            ? endDate.toISOString()
            : "2024-07-07T14:10:00",
          resample_period: timeperiod,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleDownloadPdf = async () => {
    const input = document.getElementsByClassName("report")[0];
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  };

  if (isLoading) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a
            onClick={handleDownloadPdf}
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </a>
        </div>
        <div className="report">
          {/* Content Row */}
          <KPI data={data} />

          {/* Content Row */}
          <CompositeChart />

          <div>
            <div className="row">
              <div className="col-lg-8 mb-4" style={{ height: "500px" }}>
                <RealTimeCurrentChart />
              </div>
              <div className="col-lg-4 mb-4" style={{ height: "500px" }}>
                <PowerFactorGauge />
              </div>
            </div>
          </div>

          <div>
            <div className="row">
              <div className="col-lg-4 mb-4" style={{ height: "500px" }}>
                <div>
                  <AMFgauge />
                  <AI />
                </div>
              </div>
              <div className="col-lg-8 mb-4" style={{ height: "500px" }}>
                <RealTimeVoltageChart />
              </div>
            </div>
          </div>

          <BottomTimeSeries />

          <div className="row">
            <div className="col-xl-8">
              <div>
                {/* Uncomment and update the following lines if needed */}
                {/* <ChartStack
                  data={tablesData}
                  setTimeperiod={setTimeperiod}
                  timeperiod={timeperiod}
                  bgcolor={backgroundColors}
                /> */}
              </div>
            </div>
          </div>

          <div className="row">{/* Content Column */}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
