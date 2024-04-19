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
import DashboardLoader from "../Components/Dashboard/Loading";

const Indi = () => {
  const [tablesData, setTablesData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("apfc1data");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("");
  const [loading, setLoading] = useState(false);

  const apiEndpoints = {
    apfc1data: "https://sneems.org/api/apfc1data/",
    apfc2data: "https://sneems.org/api/apfc2data/",
    apfc3data: "https://sneems.org/api/apfc3data/",
    apfc4data: "https://sneems.org/api/apfc4data/",
    apfc5data: "https://sneems.org/api/apfc5data/",
    dg1data: "https://sneems.org/api/dg1data/",
    dg2data: "https://sneems.org/api/dg2data/",
    dg3data: "https://sneems.org/api/dg3data/",
    dg4data: "https://sneems.org/api/dg4data/",
    dg5data: "https://sneems.org/api/dg5data/",
    dg6data: "https://sneems.org/api/dg6data/",
    og1data: "https://sneems.org/api/og1data/",
    og2data: "https://sneems.org/api/og2data/",
    og3data: "https://sneems.org/api/og3data/",
    og4data: "https://sneems.org/api/og4data/",
    og5data: "https://sneems.org/api/og5data/",
    og6data: "https://sneems.org/api/og6data/",
    solfeeddata: "https://sneems.org/api/solfeeddata/",
    tf1data: "https://sneems.org/api/tf1data/",
    tf2data: "https://sneems.org/api/tf2data/",
    tf3data: "https://sneems.org/api/tf3data/",
    tf4data: "https://sneems.org/api/tf4data/",
    tf5data: "https://sneems.org/api/tf5data/",
    wmt0: "https://sneems.org/api/wmt0/",
    wmt1: "https://sneems.org/api/wmt1/",
    wmt2: "https://sneems.org/api/wmt2/",
    wmwm1: "https://sneems.org/api/wmwm1/",
    wmwm2: "https://sneems.org/api/wmwm2/",
    wmwm3: "https://sneems.org/api/wmwm3/",
    wmwm4: "https://sneems.org/api/wmwm4/",
    wmwm5: "https://sneems.org/api/wmwm5/",
    wmwm6: "https://sneems.org/api/wmwm6/",
    wmwm7: "https://sneems.org/api/wmwm7/",
    wmwm8: "https://sneems.org/api/wmwm8/",
    wmwm9: "https://sneems.org/api/wmwm9/",
  };

  useEffect(() => {
    fetchData(selectedEndpoint);
  }, [selectedEndpoint, startDate, endDate, timeperiod]); // Include timeperiod in the dependency array

  const fetchData = async (endpoint) => {
    try {
      if (!endpoint) return;

      setLoading(true);

      let url = apiEndpoints[endpoint];
      if (startDate && endDate) {
        url += `?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}&resample_period=${timeperiod}`;
      } else {
        url += `?resample_period=${timeperiod}`;
      }

      const response = await axios.get(url);
      setTablesData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
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

  if (loading) {
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
      <Charts
        data={filteredData}
        timeperiod={timeperiod}
        setTimeperiod={setTimeperiod}
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

export default Indi;
