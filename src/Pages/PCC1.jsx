import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import DataTable from "../Components/Table";
import ChartsOG from "../Components/OG1/ChartOG";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Charts from "../Components/Charts";
import DashboardLoader from "../Components/Dashboard/Loading";

const PCC1 = ({ endpoint, url }) => {
  const [tablesData, setTablesData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("W");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    fetchData(endpoint);
  }, [endpoint, startDate, endDate, timeperiod]);

  const fetchData = async (endpoint) => {
    setIsLoading(true);

    try {
      if (!endpoint) return;

      let fetchUrl = url; // Use the provided URL

      if (startDate && endDate) {
        fetchUrl += `?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}&resample_period=${timeperiod}`;
        console.log("URL:", fetchUrl);
      } else {
        fetchUrl += `?resample_period=${timeperiod}`;
      }

      const response = await axios.get(fetchUrl);
      setTablesData(response.data.results);
      console.log("tablesData:", tablesData);
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
        const dateTime = new Date(item.date_time);
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
          {endpoint}
        </h1>
        {/* Additional UI elements */}
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
        setTimeperiod={setTimeperiod}
        timeperiod={timeperiod}
      />

      {/* Your DataTable component */}
      <div style={{ marginTop: "5vh" }}>
        {endpoint && (
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
            selectedEndpoint={endpoint}
          />
        )}
      </div>
    </div>
  );
};

export default PCC1;
