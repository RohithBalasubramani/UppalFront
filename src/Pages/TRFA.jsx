import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DataTable from "../Components/Table";
import { ReactComponent as DownloadIcon } from "../Assets/reporticon.svg";

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
import ReportModal from "../Components/Dashboard/Reports";

const TRFA = ({ source, heading }) => {
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

  const getEndpoint = (source) => {
    switch (source) {
      case "eb":
        return "https://www.therion.co.in/api/ebs10reading/";
      default:
        throw new Error("Invalid source");
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

  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
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

      <KPI data={data} />

      <div className="emstit">
        <span className="emstitle">Real - Time Consumption</span>
        <span className="emsspan">Status: Running EB power</span>
      </div>

      <div className="realtimeflex">
        <RealTimeChart source={source} />
        <RealTimeCurrentChart source={source} />
        <RealTimeVoltageChart source={source} />
      </div>

      {/* <div>
        <div className="row">
          <div className="col-lg-6 mb-4" style={{ height: "500px" }}></div>
          <div className="col-lg-6 mb-4" style={{ height: "500px" }}></div>
        </div>
      </div> */}
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
      />
      {/* <Powercut data={data} /> */}
      {/* <ChartAmf
            data={data?.results || []}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
          />
          <ChartAmfBottom
            data={data?.results || []}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
          /> */}

      <div style={{ marginTop: "5vh" }}>
        {data && (
          <DataTable
            tablesData={data["resampled data"]} // Pass the correct data subset
            orderBy=""
            order="asc"
            handleRequestSort={() => {}}
            sortedData={data["resampled data"]} // Ensure sorted data is correct
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
        filename={`${source}.xlsx`}
        source={source}
      />
    </div>
  );
};

export default TRFA;
