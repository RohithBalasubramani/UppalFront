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
import ChartsAno from "../Components/Anomaly/ChartAno";
import TableAno from "../Components/Anomaly/TableAno";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AnomalyReport from "../Components/Anomaly/AnomalyReport";
import DashboardLoader from "../Components/Dashboard/Loading";
// import ChartRow from "../Components/Anomaly/ChartRow";

const Anomaly = () => {
  const [tablesData, setTablesData] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    "amf1dailykwhanomalydb"
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const apiEndpoints = {
    amf1dailykwhanomalydb:
      "http://159.89.162.97/anomaly/api/amf1dailykwhanomalydb/",
    amf2dailykwhanomalydb:
      "http://159.89.162.97/anomaly/api/amf2dailykwhanomalydb/",
  };

  useEffect(() => {
    fetchData(selectedEndpoint);
  }, [selectedEndpoint, startDate, endDate]); // Include startDate and endDate in dependency array

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    try {
      if (!endpoint) return;

      let url = apiEndpoints[endpoint];
      if (startDate && endDate) {
        url += `?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}`;
      }

      const response = await axios.get(url);
      setTablesData(response.data.results);

      // Additional logic to fetch related data based on the selected endpoint
      if (endpoint === "amf1dailykwhanomalydb") {
        const additionalResponse = await axios.get(
          "http://159.89.162.97/api/amf1dailykwh/"
        );
        setAdditionalData(additionalResponse.data); // Set the additional data state (modify this as per your requirement)
      } else if (endpoint === "amf2dailykwhanomalydb") {
        const additionalResponse = await axios.get(
          "http://159.89.162.97/api/amf2dailykwh/"
        );
        setAdditionalData(additionalResponse.data); // Set the additional data state (modify this as per your requirement)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  // Assuming 'data' is your dataset array containing objects with a 'reason' field
  const uniqueReasons = [...new Set(tablesData.map((item) => item.reason))];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    let dataToFilter = tablesData;

    if (selectedReason) {
      dataToFilter = dataToFilter.filter(
        (item) => item.reason === selectedReason
      );
    }

    if (startDate && endDate) {
      return dataToFilter.filter((item) => {
        const dateTime = new Date(item.date_time);
        return dateTime >= startDate && dateTime <= endDate;
      });
    }

    return dataToFilter;
  }, [startDate, endDate, tablesData, selectedReason]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

        <PDFDownloadLink
          document={<AnomalyReport />}
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <div>
                <i className="fas fa-download fa-sm text-white-50"></i> Generate
                Anomaly Report
              </div>
            )
          }
        </PDFDownloadLink>
      </div>

      <div
        className="d-sm-flex align-items-center justify-content-between mb-4"
        style={{ marginBottom: "1vh" }}
      >
        {/* Your UI elements */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", gap: "1vw" }}>
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
          </div>
        </LocalizationProvider>
        <div style={{ marginRight: "0vw", marginLeft: "auto" }}>
          <FormControl size="small">
            <InputLabel id="select-reason-label">Select Reason</InputLabel>
            <Select
              labelId="select-reason-label"
              id="select-reason"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              label="Select Reason"
              sx={{ minWidth: "15vw" }}
            >
              <MenuItem value="">All</MenuItem>
              {/* Replace 'uniqueReasons' with an array containing unique reasons */}
              {uniqueReasons.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Rest of your UI */}
      </div>

      {/* Your Charts component */}
      <ChartsAno data={filteredData} totalDataset={additionalData} />

      {/* Your DataTable component */}
      <div style={{ marginTop: "5vh" }}>
        {selectedEndpoint && (
          <TableAno
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

export default Anomaly;
