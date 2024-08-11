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
import { ReactComponent as DownloadIcon } from "../Assets/reporticon.svg";
import ReportModal from "./Dashboard/Reports";
// Import the modal component

const RealTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  margin-top: 3vh;
  margin-bottom: 3vh;
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [dateRange, setDateRange] = useState("today");

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, timeperiod]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Get current date
      const today = new Date();

      // Set start date to the first day of the current month
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      // Set start and end dates in ISO format
      const startDateISO = startOfMonth.toISOString();
      const endDateISO = today.toISOString();

      // Use dynamic dates for API request
      const endpoint = "https://www.therion.co.in/analytics/api/timeserieslog/";
      const response = await axios.get(endpoint, {
        params: {
          start_date_time: startDateISO,
          end_date_time: endDateISO,
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

  const handleGenerateReportClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (reportData) => {
    // Handle the report data (dataType, format, range) as needed
    console.log(reportData);
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
          <div className="emstit">
            <span className="emstitle">Dashboard</span>
            <span className="emsspan">Overview of Building Energy Usage</span>
          </div>
          <button onClick={handleGenerateReportClick} className="emsbutton">
            <i className="emsbuttonicon">
              <DownloadIcon />
            </i>
            <span>Generate Report</span>
          </button>
        </div>
        <div className="report">
          {/* Content Row */}

          <div className="row">
            <div className="col-lg-8 mb-4">
              <div>
                <KPI data={data} />
                <AMFgauge />
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div>
                <WeatherWidget />
              </div>
            </div>
          </div>

          {/* Content Row */}
          <div className="emstit">
            <span className="emstitle">Real - Time Consumption</span>
            <span className="emsspan">Status: Running EB power</span>
          </div>
          <div className="realtimeflex">
            <CompositeChart />
            <RealTimeCurrentChart />
            <RealTimeVoltageChart />
          </div>
          <div className="emstit">
            <span className="emstitle">Energy Consumption History</span>
            <span className="emsspan">
              Access and analyze historical energy consumption trends to
              identify patterns and areas for improvement.
            </span>
          </div>

          <BottomTimeSeries />
        </div>
      </div>
      <ReportModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        timeperiod={timeperiod}
        setTimeperiod={setTimeperiod}
        dateRange={dateRange}
        setDateRange={setDateRange}
        data={data}
        filename="datatable.xlsx"
      />
    </div>
  );
};

export default DashboardPage;
