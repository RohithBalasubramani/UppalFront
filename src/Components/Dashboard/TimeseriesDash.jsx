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

const BottomTimeSeries = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("W");
  const [dateRange, setDateRange] = useState("all");
  const [data, setData] = useState(null);

  const handleChange = (event, newAlignment) => {
    setTimeperiod(newAlignment);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://117.203.101.153/analytics/api/timeserieslog/?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}&resample_period=${timeperiod}`
          );
          const result = await response.json();
          setData(result);
          console.log("datatimedash", data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [startDate, endDate, timeperiod]);

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

      <div className="card-header py-3" style={{ display: "flex" }}>
        <TimeBar
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <div
          style={{ marginRight: "1vw", marginLeft: "auto", marginTop: "3vh" }}
        >
          <ToggleButtonGroup
            color="primary"
            value={timeperiod}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="H">Hour</ToggleButton>
            <ToggleButton value="D">Day</ToggleButton>
            <ToggleButton value="W">Week</ToggleButton>
            <ToggleButton value="M">Month</ToggleButton>
            <ToggleButton value="Q">Quartile</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {data && (
        <>
          <div>
            <div className="row">
              <div className="col-lg-4 mb-4" style={{ height: "500px" }}>
                <div>
                  <DonutChart
                    data={data}
                    timeperiod={timeperiod}
                    start_date={startDate}
                    end_date={endDate}
                  />
                </div>
              </div>
              <div className="col-lg-8 mb-4" style={{ height: "500px" }}>
                <StackedBarDGEB
                  data={data}
                  timeperiod={timeperiod}
                  start_date={startDate}
                  end_date={endDate}
                />
              </div>
            </div>
          </div>

          <Powercut
            timeperiod={timeperiod}
            startDate={startDate}
            endDate={endDate}
          />
          <StackedBarChart
            data={data}
            timeperiod={timeperiod}
            start_date={startDate}
            end_date={endDate}
          />

          <div>
            <div className="row">
              <div className="col-lg-8 mb-4" style={{}}>
                <div>
                  <EnergyComp
                    data={data}
                    timeperiod={timeperiod}
                    start_date={startDate}
                    end_date={endDate}
                  />
                </div>
              </div>
              <div className="col-lg-4 mb-4" style={{ marginTop: "15vh" }}>
                <WeatherWidget className="col-xl-4" />
              </div>
            </div>
          </div>

          <MySankeyChart
            data={data}
            timeperiod={timeperiod}
            start_date={startDate}
            end_date={endDate}
          />
        </>
      )}
    </div>
  );
};

export default BottomTimeSeries;
