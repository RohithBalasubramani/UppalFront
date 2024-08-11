import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TimeBar from "../TRFF/TimePeriod"; // Ensure this path is correct
import DonutChart from "./DonutDash";
import StackedBarChart from "./StackedChart";
import Powercut from "./Powercuts";
import StackedBarDGEB from "./StackTest";
import MySankeyChart from "./Sankee";
import EnergyComp from "./EnergyPage";
import WeatherWidget from "./Weather";
import dayjs from "dayjs";
import VerticalChart from "./BarchartVertical";
import CostChart from "./CostChart";
import CombinedChart from "./Combine";
import DataTable from "../TableDGEB";

const BottomTimeSeries = () => {
  // Initialize state with default values
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [timeperiod, setTimeperiod] = useState("D");
  const [dateRange, setDateRange] = useState("month");
  const [data, setData] = useState(null);

  // Function to fetch data
  const fetchData = async (start, end, period) => {
    try {
      const response = await fetch(
        `https://www.therion.co.in/analytics/api/timeserieslog/?start_date_time=${start.toISOString()}&end_date_time=${end.toISOString()}&resample_period=${period}`
      );
      const result = await response.json();
      setData(result);
      console.log("datatimedash", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on initial render and whenever startDate, endDate, or timeperiod changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchData(startDate, endDate, timeperiod);
    }
  }, [startDate, endDate, timeperiod]);

  // Handle time period change
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setTimeperiod(newAlignment);
    }
  };

  // Define color palette for charts
  const backgroundColors = [
    "#ED75A3",
    "#017EF3",
    "#BF72D5",
    "#F09773",
    "#FFC550",
    "#434343",
    "#ff4d00",
    "#C9CBCF",
  ];

  const backgroundColors2 = [
    "#ED75A3",
    "#017EF3",

    "#434343",
    "#ff4d00",
    "#C9CBCF",
    "#BF72D5",
    "#FFC550",
    "#F09773",
  ];

  const bgsource = ["#5630BC", "#8963EF", "#C4B1F7"];

  return (
    <div>
      {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
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
      </div> */}

      {data && (
        <>
          <div>
            <StackedBarDGEB
              data={data}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              timeperiod={timeperiod}
              setTimeperiod={setTimeperiod}
              dateRange={dateRange}
              setDateRange={setDateRange}
              backgroundColors={bgsource}
            />
            <CostChart
              data={data}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              timeperiod={timeperiod}
              setTimeperiod={setTimeperiod}
              dateRange={dateRange}
              setDateRange={setDateRange}
              backgroundColors={bgsource}
            />

            <div className="row">
              <div className="col-lg-4 mb-4">
                <div>
                  <DonutChart
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
                </div>
              </div>
              <div className="col-lg-8 mb-3">
                <VerticalChart
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
              </div>
            </div>
          </div>
          {/* 
          <Powercut
            timeperiod={timeperiod}
            startDate={startDate}
            endDate={endDate}
          /> */}
          <StackedBarChart
            data={data}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            timeperiod={timeperiod}
            setTimeperiod={setTimeperiod}
            dateRange={dateRange}
            setDateRange={setDateRange}
            backgroundColors={backgroundColors2}
          />
          <div>
            <div className="row">
              <div className="col-lg-6 mb-4" style={{}}>
                <div>
                  <EnergyComp
                    data={data}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    timeperiod={timeperiod}
                    setTimeperiod={setTimeperiod}
                  />
                </div>
              </div>
              {/* <div className="col-lg-4 mb-4">
                <WeatherWidget className="col-xl-4" />
              </div> */}
            </div>
          </div>

          <MySankeyChart
            data={data}
            dateRange={dateRange}
            setDateRange={setDateRange}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            timeperiod={timeperiod}
            setTimeperiod={setTimeperiod}
          />

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
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BottomTimeSeries;
