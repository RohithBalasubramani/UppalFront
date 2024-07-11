import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DataTable from "../Components/Table";

import DashboardLoader from "../Components/Dashboard/Loading";
// import RealTimeChart from "../Components/TRFA/Composite";
// import RealTimeCurrentChart from "../Components/TRFA/CurrentRealtime";
// import RealTimeVoltageChart from "../Components/TRFA/VoltageRealTime";
import TimeBar from "../Components/TRFF/TimePeriod";
// import CompositeChart from "../Components/TRFF/Composite";
// import VoltageCurrent from "../Components/TRFA/BottomCharts";
import Powercut from "../Components/TRFA/Powercut";
import ChartAmf from "../Components/PepplData/ChartAmf";
import ChartAmfBottom from "../Components/PepplData/BottomCharts";
import RealTimeCurrentChart from "../Components/Feeders/RealtimeCurrent";
import RealTimeChart from "../Components/Feeders/Composite";
import RealTimeVoltageChart from "../Components/Feeders/RealtimeVoltage";
import KPI from "../Components/Feeders/KPI";
import CompositeChart from "../Components/Feeders/CompositeTime";
import VoltageCurrent from "../Components/Feeders/BottomCharts";

const Feeders = ({ source, heading }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(heading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("H");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("all");
  const [data, setData] = useState(null);

  const getEndpoint = (source) => {
    switch (source) {
      case "skyde":
        return "https://www.therion.co.in/api/skyd1reading/";
      case "utility":
        return "https://www.therion.co.in/api/utility1st2ndfs2reading/";
      case "sparestation3":
        return "https://www.therion.co.in/api/sparestation3reading/";
      case "zoho":
        return "https://www.therion.co.in/api/thirdfloorzohos4reading/";
      case "sparestation5":
        return "https://www.therion.co.in/api/sixthfloors5reading/";
      case "sparestation6":
        return "https://www.therion.co.in/api/spares6reading/";
      case "sparestation7":
        return "https://www.therion.co.in/api/spares7reading/";
      case "kotak":
        return "https://www.therion.co.in/api/thirdfifthfloorkotakreading/";
      case "solar":
        return "https://www.therion.co.in/api/solars13reading/";
      default:
        throw new Error("Invalid source");
    }
  };

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
        <h1
          className="h3 mb-0 text-gray-800"
          style={{ textTransform: "capitalize" }}
        >
          {heading}
        </h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>

      <KPI data={data} />
      <RealTimeChart source={source} />

      <div>
        <div className="row">
          <div className="col-lg-6 mb-4" style={{ height: "500px" }}>
            <RealTimeCurrentChart source={source} />
          </div>
          <div className="col-lg-6 mb-4" style={{ height: "500px" }}>
            <RealTimeVoltageChart source={source} />
          </div>
        </div>
      </div>

      <div className="d-sm-flex align-items-center justify-content-between mb-4">
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
      </div>

      <TimeBar
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="card shadow mb-4">
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
            >
              <ToggleButton value="H">Hour</ToggleButton>
              <ToggleButton value="D">Day</ToggleButton>
              <ToggleButton value="W">Week</ToggleButton>
              <ToggleButton value="M">Month</ToggleButton>
              <ToggleButton value="Q">Quartile</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <div className="card-body">
          <CompositeChart data={data} />
          <VoltageCurrent data={data} />
          <Powercut data={data} />
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
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          debitis.
        </div>
      </div>

      <div style={{ marginTop: "5vh" }}>
        {data && (
          <DataTable
            tablesData={data["resampled data"]}
            orderBy=""
            order="asc"
            handleRequestSort={() => {}}
            sortedData={data["resampled data"]}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={(event, newPage) => setPage(newPage)}
            handleChangeRowsPerPage={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            selectedEndpoint={selectedEndpoint}
          />
        )}
      </div>
    </div>
  );
};

export default Feeders;
