import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ChartAmf from "../Components/TRFA/ChartdiffAmf";
import DashboardLoader from "../Components/Dashboard/Loading";

const AMFDifference = ({ apiEndpoints, apiEndpointsb }) => {
  const [tablesData1, setTablesData1] = useState({}); // Changed variable name
  const [tablesData2, setTablesData2] = useState({}); // Changed variable name
  const [selectedEndpoint, setSelectedEndpoint] = useState("upsincm1dataH");
  const [selectedEndpoint2, setSelectedEndpoint2] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [timeperiod, setTimeperiod] = useState("W");

  useEffect(() => {
    if (selectedEndpoint) {
      setSelectedEndpoint2(getSelectedEndpoint2(selectedEndpoint));
    }
  }, [selectedEndpoint]);

  useEffect(() => {
    fetchData(selectedEndpoint);
    fetchDatab(selectedEndpoint2);
  }, [selectedEndpoint, selectedEndpoint2, startDate, endDate, timeperiod]);

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
      // console.log(response);
      setTablesData1(response.data.results);
      console.log("tablesdata1", tablesData1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const fetchDatab = async (endpoint) => {
    try {
      if (!endpoint) return;

      let url = apiEndpoints[endpoint];
      if (startDate && endDate) {
        url += `?start_date_time=${startDate.toISOString()}&end_date_time=${endDate.toISOString()}&resample_period=${timeperiod}`;
      } else {
        url += `?resample_period=${timeperiod}`;
      }

      const response = await axios.get(url);
      // console.log(response);
      setTablesData2(response.data.results);
      console.log("tablesdata2", tablesData2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSelectedEndpoint2 = (selectedEndpoint) => {
    const index = Object.keys(apiEndpoints).indexOf(selectedEndpoint);
    if (index !== -1) {
      const endpointKeys = Object.keys(apiEndpointsb);
      return endpointKeys[index];
    }
    return "";
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
          {selectedEndpoint} and {selectedEndpoint2}
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
        {/* Your UI elements for selecting date range */}
      </div>

      {/* Chart component */}
      <ChartAmf
        data1={tablesData1} // Pass data1 as tablesData1[selectedEndpoint]
        data2={tablesData2} // Pass data2 as tablesData2[selectedEndpoint2]
        setTimeperiod={setTimeperiod}
        timeperiod={timeperiod}
      />
    </div>
  );
};

export default AMFDifference;
