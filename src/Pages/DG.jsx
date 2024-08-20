import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import DataTable from "../Components/Table";
import DashboardLoader from "../Components/Dashboard/Loading";
import RealTimeChart from "../Components/TRFA/Composite";
import RealTimeCurrentChart from "../Components/TRFA/CurrentRealtime";
import RealTimeVoltageChart from "../Components/TRFA/VoltageRealTime";
import TimeBar from "../Components/TRFF/TimePeriod";
import CompositeChart from "../Components/TRFF/Composite";
import VoltageCurrent from "../Components/TRFA/BottomCharts";
import Powercut from "../Components/TRFA/Powercut";
import ChartAmf from "../Components/PepplData/ChartAmf";
import ChartAmfBottom from "../Components/PepplData/BottomCharts";
import KPI from "../Components/TRFF/KPI";
import dayjs from "dayjs";
import ExportToExcelButton from "../Components/export2excel";
import { ReactComponent as DownloadIcon } from "../Assets/reporticon.svg";
import ReportModal from "../Components/Dashboard/Reports";

const DGpage = ({ source, heading }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(heading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [timeperiod, setTimeperiod] = useState("H");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("today");
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const [alignment, setAlignment] = useState(source); // Add state for toggle button alignment
  const navigate = useNavigate(); // useNavigate hook for routing

  const getEndpoint = (source) => {
    switch (source) {
      case "dg1":
        return "https://www.therion.co.in/api/dg1s12reading/";
      case "dg2":
        return "https://www.therion.co.in/api/dg2s3reading/";
      default:
        throw new Error("Invalid source");
    }
  };

  const backgroundColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(201, 203, 207, 0.6)",
    "rgba(0, 123, 255, 0.6)",
  ];

  const handleToggleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      navigate(`/${newAlignment}`); // Navigate to the corresponding DG page
    }
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

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, timeperiod, source]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const endpoint = getEndpoint(source);
      const response = await axios.get(endpoint, {
        params: {
          start_date_time: startDate
            ? startDate.toISOString()
            : "2024-07-06T14:00:00",
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

  if (isLoading) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <div className="emstit">
          <span className="emstitle">{source} Source</span>
          <span className="emsspan">Overview of {source} Energy Usage</span>
        </div>

        <a className="d-none d-sm-inline-block">
          <button onClick={handleGenerateReportClick} className="emsbutton">
            <i className="emsbuttonicon">
              <DownloadIcon />
            </i>
            <span>Generate Report</span>
          </button>
        </a>
      </div>

      {/* Add the ToggleButtonGroup */}
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="DG selection"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          height: "8vh",
          marginBottom: "5vh",
          gap: "0.5vw",
          "& .MuiToggleButtonGroup-grouped": {
            border: 0,
            height: "8vh",
            color: "var(--Gray---Typography-800, #1B2533)",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 500,
            textTransform: "capitalize",
            lineHeight: "24px", // 171.429%

            backgroundColor: "#ffffff",
            borderRadius: "24px",
            // Set border radius for toggle button group
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "#C4B1F7", // Set your custom selected background color
              color: "#1A2027", // Set your custom selected text color
              borderRadius: "24px", // Set border radius for selected button
            },
          },
        }}
      >
        <ToggleButton value="dg1">Diesel Generator 1</ToggleButton>
        <ToggleButton value="dg2">Diesel Generator 2</ToggleButton>
      </ToggleButtonGroup>

      <KPI data={data} />

      <div className="emstit">
        <span className="emstitle">Real - Time Consumption</span>
        <span className="emsspan">Status: Running EB power</span>
      </div>

      <div className="realtimeflex">
        <RealTimeChart
          source={source}
          // Set border radius for real-time chart
        />
        <RealTimeCurrentChart
          source={source}
          // Set border radius for real-time current chart
        />
        <RealTimeVoltageChart
          source={source}
          // Set border radius for real-time voltage chart
        />
      </div>

      <div className="emstit">
        <span className="emstitle">Energy Consumption History</span>
        <span className="emsspan">
          Access and analyze historical energy consumption trends to identify
          patterns and areas for improvement.
        </span>
      </div>

      <CompositeChart
        data={data}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        timeperiod={timeperiod}
        setTimeperiod={setTimeperiod}
        dateRange={dateRange}
        setDateRange={setDateRange}
        backgroundColors={backgroundColors}
        // Set border radius for composite chart
      />
      <VoltageCurrent
        data={data}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        timeperiod={timeperiod}
        setTimeperiod={setTimeperiod}
        dateRange={dateRange}
        setDateRange={setDateRange}
        backgroundColors={backgroundColors}
        // Set border radius for voltage/current chart
      />

      <div style={{ marginTop: "5vh", borderRadius: "24px" }}>
        {data && (
          <DataTable
            tablesData={data["resampled data"]}
            orderBy=""
            order="asc"
            handleRequestSort={() => {}}
            sortedData={data["resampled data"]}
            rowsPerPage={10}
            handleChangePage={() => {}}
            handleChangeRowsPerPage={() => {}}
            selectedEndpoint="Your API Endpoint"
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            timeperiod={timeperiod}
            setTimeperiod={setTimeperiod}
            dateRange={dateRange}
            setDateRange={setDateRange}
            source={source}
            // Set border radius for data table
          />
        )}
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
        data={data ? data["resampled data"] : []}
        source={source}
        filename={`${source}.xlsx`} // Correctly use template literals here
      />
    </div>
  );
};

export default DGpage;
