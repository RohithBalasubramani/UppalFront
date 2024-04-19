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
import ChartsOG from "../Components/OG1/ChartOG";
import DonutChart from "../Components/OG1/DonutOG";
import DataTableOG from "../Components/OG1/TableOG";
import DashboardLoader from "../Components/Dashboard/Loading";

const OG2 = () => {
  const [tablesData, setTablesData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("OG 1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("D");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const apiEndpoints = {
    // celltoolpdb1data: "https://sneems.org/pcc1/api/celltoolpdb1data/",
    pcc2incomerdata: "https://sneems.org/pcc1/api/pcc2incomerdata/",
    ups1og2data: "https://sneems.org/pcc1/api/ups1og2data/",
    ups2og2data: "https://sneems.org/pcc1/api/ups2og2data/",
  };

  useEffect(() => {
    fetchAllData();
  }, [startDate, endDate, timeperiod]);

  const fetchAllData = async () => {
    try {
      const allData = [];
      const PieData = [];

      for (const endpoint in apiEndpoints) {
        if (apiEndpoints.hasOwnProperty(endpoint)) {
          const data = await fetchData(endpoint);
          const kwhDifference = calculateKwhDifference(data);
          PieData.push({ endpoint: endpoint, kwhDifference: kwhDifference });
          allData.push({ endpoint, data });
        }
      }
      setPieData(PieData);
      setTablesData(allData);
      console.log("all data", allData);
      console.log("Pie datta", PieData);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

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
      return response.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
    setIsLoading(false);
  };

  const calculateKwhDifference = (data) => {
    if (data.length < 2) {
      return 0; // Not enough data to calculate the difference
    }

    const firstKwh = data[0].kwh;
    const lastKwh = data[data.length - 1].kwh;

    return lastKwh - firstKwh;
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
      <ChartsOG
        data={pieData}
        timeperiod={timeperiod}
        setTimeperiod={setTimeperiod}
      />

      {/* Your DataTable component
      <div style={{ marginTop: "5vh" }}>
        {selectedEndpoint && (
          <DataTableOG
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
      </div> */}
    </div>
  );
};

export default OG2;
