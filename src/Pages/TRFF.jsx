import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import DataTable from "../Components/Table";
import Charts from "../Components/Charts";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ChartAmf from "../Components/PepplData/ChartAmf";
import ChartAmfBottom from "../Components/PepplData/BottomCharts";
import KPI from "../Components/PepplData/KPI";
import ChartStack from "../Components/TRFF/StackedChart";
import DonutChart from "../Components/TRFF/Donut";
import LineChart from "../Components/TRFF/LineChart";
import ChartHeatmap from "../Components/TRFF/Scatter";
import HeatmapChart from "../Components/TRFF/Heatmaps";
import CompositeChart from "../Components/TRFF/Composite";
import TimeBar from "../Components/TRFF/TimePeriod";
import DashboardLoader from "../Components/Dashboard/Loading";

const TRFF = ({ apiEndpoints }) => {
  const [tablesData, setTablesData] = useState([]);
  //   const [selectedEndpoint, setSelectedEndpoint] = useState("tf1data");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("W");
  const [dateRange, setDateRange] = useState("all");

  const backgroundColors = [
    "rgba(153, 0, 204, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(105, 105, 105, 0.6)", // Dark gray
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 140, 0, 0.6)",
  ];

  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
  };

  useEffect(() => {
    fetchData();
  }, [endDate, timeperiod]);
  // Include timeperiod in the dependency array

  const fetchData = async () => {
    setIsLoading(true); // Start loading
    console.log("Loading:", isLoading);
    try {
      const promises = Object.keys(apiEndpoints).map(async (endpoint) => {
        let url = apiEndpoints[endpoint];
        if (startDate && endDate) {
          url += `?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}&resample_period=${timeperiod}`;
          console.log("URL:", url);
        } else {
          url += `?resample_period=${timeperiod}`;
        }
        const response = await axios.get(url);
        return { endpoint, data: response.data.results };
      });
      const results = await Promise.all(promises);
      const combinedData = {};
      results.forEach(({ endpoint, data }) => {
        combinedData[endpoint] = data;
      });
      setTablesData(combinedData);
      console.log("tablesdata", tablesData);
      console.log("combineddata", combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false); // End loading
  };

  if (isLoading) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  // const handleRequestSort = (property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // const filteredData = useMemo(() => {
  //   if (startDate && endDate) {
  //     return tablesData.filter((item) => {
  //       const dateTime = new Date(item.date_time); // Adjust based on the date-time property in your tablesData
  //       return dateTime >= startDate && dateTime <= endDate;
  //     });
  //   }
  //   return tablesData;
  // }, [startDate, endDate, tablesData]);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  console.log("Timeperiod", timeperiod);

  // const labels = Object.keys(tablesData);
  // const datasets = [];

  // // Iterate over each label (endpoint)
  // labels.forEach((label) => {
  //   const endpointData = tablesData[label]; // Extract endpoint data for the current label

  //   // Iterate over each item in the endpoint data
  //   endpointData.forEach((item) => {
  //     const { date_time, kw } = item; // Extract date_time and kw from the item

  //     // Find if the date_time already exists in datasets
  //     const existingDataIndex = datasets.findIndex(
  //       (data) => data.date_time === date_time
  //     );

  //     // If date_time doesn't exist in datasets, create a new data object
  //     if (existingDataIndex === -1) {
  //       const newData = {
  //         date_time: date_time, // Include date_time in the data object
  //       };
  //       newData[`${label}_kw`] = kw;
  //       datasets.push(newData);
  //     } else {
  //       // If date_time exists, add kw to the existing data object
  //       datasets[existingDataIndex][`${label}_kw`] = kw;
  //     }
  //   });
  // });

  // console.log("datasets", datasets);

  return (
    <div className="container-fluid">
      {" "}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1
          className="h3 mb-0 text-gray-800"
          style={{ textTransform: "capitalize" }}
        >
          Transformer 1 Feeders
        </h1>
        {/* <div style={{ marginRight: "2vw", marginLeft: "auto" }}>
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
        </div> */}

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
      <TimeBar
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      {/* <KPI data={tablesData} /> */}
      {/* Your Charts component */}
      <div className="card shadow mb-">
        <div className="card-header py-3" style={{ display: "flex" }}>
          <h6
            style={{ width: "10vw", display: "flex" }}
            className="m-0 font-weight-bold text-primary"
          >
            Area Chart
          </h6>
          <div style={{ marginRight: "1vw", marginLeft: "auto" }}>
            <ToggleButtonGroup
              color="primary"
              value={timeperiod}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{}}
            >
              <ToggleButton value="H">Hour</ToggleButton>
              <ToggleButton value="W">Week</ToggleButton>
              <ToggleButton value="M">Month</ToggleButton>
              <ToggleButton value="Q">Quartile</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="card-body">
          <ChartStack
            data={tablesData}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
            bgcolor={backgroundColors}
          />
          <DonutChart
            data={tablesData}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
            bgcolor={backgroundColors}
          />
          <hr />
          <LineChart
            data={tablesData}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
            bgcolor={backgroundColors}
          />

          <CompositeChart
            data={tablesData}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
          />
          <HeatmapChart
            data={tablesData}
            setTimeperiod={setTimeperiod}
            timeperiod={timeperiod}
          />
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          debitis. */}
        </div>
      </div>
      {/* Your DataTable component */}
      {/* <div style={{ marginTop: "5vh" }}>
        <DataTable
          tablesData={datasets}
          orderBy={orderBy}
          order={order}
          handleRequestSort={handleRequestSort}
          sortedData={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div> */}
    </div>
  );
};

export default TRFF;
