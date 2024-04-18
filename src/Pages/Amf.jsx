import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import DataTable from "../Components/Table";
import Charts from "../Components/Charts";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ChartAmf from "../Components/PepplData/ChartAmf";
import DashboardLoader from "../Components/Dashboard/Loading";

const AMF = () => {
  const [tablesData, setTablesData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("amf1dailykwh");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("W");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const apiEndpoints = {
    amf1dailykwh: "http://159.89.162.97/api/amf1dailykwh/",
    amf2dailykwh: "http://159.89.162.97/api/amf2dailykwh/",
    amf3daily: "http://159.89.162.97/api/amf3daily/",
  };

  useEffect(() => {
    fetchData(selectedEndpoint);
  }, [selectedEndpoint, startDate, endDate, timeperiod]); // Include timeperiod in the dependency array

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    try {
      if (!endpoint) return;

      let url = apiEndpoints[endpoint];
      if (startDate && endDate) {
        url += `?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}&resample_period=${timeperiod}`;
      } else {
        url += `?resample_period=${timeperiod}`;
      }

      const response = await axios.get(url);
      setTablesData(response.data.results);
      console.log(tablesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    if (startDate && endDate) {
      return tablesData.filter((item) => {
        const dateTime = new Date(item.date_time); // Adjust based on the date-time property in your tablesData
        return dateTime >= startDate && dateTime <= endDate;
      });
    }
    return tablesData;
  }, [startDate, endDate, tablesData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("Timeperiod", timeperiod);

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
        <h1
          className="h3 mb-0 text-gray-800"
          style={{ textTransform: "capitalize" }}
        >
          {selectedEndpoint}
        </h1>
        <div style={{ marginRight: "2vw", marginLeft: "auto" }}>
          <FormControl size="small">
            <InputLabel id="select-endpoint-label">Select Subsystem</InputLabel>
            <Select
              labelId="select-endpoint-label"
              id="select-endpoint"
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              label="Select Subsystem"
            >
              {Object.keys(apiEndpoints).map((endpointKey) => (
                <MenuItem key={endpointKey} value={endpointKey}>
                  {endpointKey}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        {/* Your UI elements */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            orientation="landscape"
            label="Start Date-Time"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <MobileDateTimePicker
            orientation="landscape"
            label="End Date-Time"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
        {/* Rest of your UI */}
      </div>

      {/* Your Charts component */}
      <ChartAmf
        data={filteredData}
        setTimeperiod={setTimeperiod}
        timeperiod={timeperiod}
      />

      {/* Your DataTable component */}
      <div style={{ marginTop: "5vh" }}>
        {selectedEndpoint && (
          <DataTable
            tablesData={tablesData}
            orderBy={orderBy}
            order={order}
            handleRequestSort={handleRequestSort}
            sortedData={filteredData}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            selectedEndpoint={selectedEndpoint}
          />
        )}
      </div>
    </div>
  );
};

export default AMF;
