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
import { Badge } from "@mui/material";
import dayjs from "dayjs";

// Styled components
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
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [timeperiod, setTimeperiod] = useState("H");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState("today");

  // Data transformation logic
  const transformData = (tablesData) => {
    return tablesData.map((row) => {
      const transformedRow = {};
      Object.entries(row).forEach(([key, value]) => {
        if (!key.includes("_kwh") && key !== "id") {
          switch (key) {
            case "APFCS11Reading_kw":
              transformedRow["APFC(Kwh)"] = value;
              break;
            case "DG1S12Reading_kw":
              transformedRow["DG1(Kwh)"] = value;
              break;
            case "DG2S3Reading_kw":
              transformedRow["DG2(Kwh)"] = value;
              break;
            case "EBS10Reading_kw":
              transformedRow["EB(Kwh)"] = value;
              break;
            case "Utility1st2ndFS2Reading_kw_eb":
              transformedRow["Utility EB(Wh)"] = value;
              break;
            case "ThirdFloorZohoS4Reading_kw_eb":
              transformedRow["Zoho EB(Wh)"] = value;
              break;
            case "Skyd1Reading_kw_eb":
              transformedRow["Skyde EB(Wh)"] = value;
              break;
            case "ThirdFifthFloorKotakReading_kw_eb":
              transformedRow["Kotak EB(Wh)"] = value;
              break;
            case "SpareStation3Reading_kw_eb":
              transformedRow["Spare-3 EB(Wh)"] = value;
              break;
            case "SpareS6Reading_kw_eb":
              transformedRow["Spare-6 EB(Wh)"] = value;
              break;

            case "SpareS7Reading_kw_eb":
              transformedRow["Spare-7 EB(Wh)"] = value;
              break;
            case "SixthFloorS5Reading_kw_eb":
              transformedRow["Sixth Floor EB(Wh)"] = value;
              break;
            case "SolarS13Reading_kw":
              transformedRow["Solar(Kwh)"] = value;
              break;
            default:
              transformedRow[key] = value;
              break;
          }
        }
      });
      return transformedRow;
    });
  };

  useEffect(() => {
    fetchData();
    fetchData2(startDate, endDate, timeperiod);
  }, [startDate, endDate, timeperiod]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startDateISO = startOfMonth.toISOString();
      const endDateISO = today.toISOString();

      const endpoint = "https://www.therion.co.in/analytics/api/timeserieslog/";
      const response = await axios.get(endpoint, {
        params: {
          start_date_time: startDateISO,
          end_date_time: endDateISO,
          resample_period: "W",
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const fetchData2 = async (start, end, period) => {
    try {
      const response = await fetch(
        `https://www.therion.co.in/analytics/api/timeserieslog/?start_date_time=${start.toISOString()}&end_date_time=${end.toISOString()}&resample_period=${period}`
      );
      const result = await response.json();
      const transformedData = transformData(result["resampled data"]); // Fixed transformation
      setReportData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  const handleModalSubmit = (formData) => {
    console.log("Report Data Submitted:", formData);
    // You can process or save the data here
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
        data={reportData} // Pass the processed reportData directly
        filename="M2TotalReport.xlsx"
      />
    </div>
  );
};

export default DashboardPage;
