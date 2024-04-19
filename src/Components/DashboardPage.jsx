import React, { useState, useEffect } from "react";
import DonutChart from "./Dashboard/DonutDash";
import axios from "axios";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import CompositeChart from "./Dashboard/Composite";
import ChartStack from "./Dashboard/StackedChart";
// import GaugeChart from "./Dashboard/Gauge";
import EnergyMeter from "./Dashboard/Energy";
import {
  Gauge,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from "@mui/x-charts";
import GaugePointer from "./Dashboard/EnergyGauge";
import MySankeyChart from "./Dashboard/Sankee";
import DashboardLoader from "./Dashboard/Loading";
import AMFgauge from "./Dashboard/AmfGauge";
import EnergyComp from "./Dashboard/EnergyPage";
import WeatherWidget from "./Dashboard/Weather";
import KPI from "./Dashboard/KPI";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import AI from "./Dashboard/AI";

const DashboardPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeperiod, setTimeperiod] = useState("W");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [tablesData, setTablesData] = useState([]);

  const apiEndpoints = {
    tf1data: "https://sneems.org/api/tf1data/",
    tf2data: "https://sneems.org/api/tf2data/",
    tf3data: "https://sneems.org/api/tf3data/",
    tf4data: "https://sneems.org/api/tf4data/",
  };

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

  useEffect(() => {
    fetchData();
  }, [endDate, timeperiod]);
  // Include timeperiod in the dependency array

  const fetchData = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleDownloadPdf = async () => {
    const input = document.getElementsByClassName("report")[0];
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  };

  const totalOG1 =
    tablesData.tf1data?.reduce((total, data) => total + data.act_pwr, 0) || 0;
  const totalOG2 =
    tablesData.tf2data?.reduce((total, data) => total + data.act_pwr, 0) || 0;
  const totalOG3 =
    tablesData.tf3data?.reduce((total, data) => total + data.act_pwr, 0) || 0;
  const totalOG4 =
    tablesData.tf4data?.reduce((total, data) => total + data.act_pwr, 0) || 0;

  const amf1per =
    ((totalOG1 + totalOG2) * 100) / (totalOG1 + totalOG2 + totalOG3 + totalOG4);
  const amf2per =
    ((totalOG3 + totalOG4) * 100) / (totalOG1 + totalOG2 + totalOG3 + totalOG4);

  if (isLoading) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        {/*  <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <a
            onClick={handleDownloadPdf}
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-download fa-sm text-white-50"></i> Generate
            Report
          </a>
        </div>
        <div className="report">
          {/*  <!-- Content Row --> */}
          <KPI />

          {/*  <!-- Content Row --> */}

          <div className="row">
            {/*   <!-- Area Chart --> */}
            <div className="col-xl-8">
              <div>
                {/*  <!-- Card Header - Dropdown --> */}
                {/*  <!-- Card Body --> */}
                <CompositeChart
                  data={tablesData}
                  setTimeperiod={setTimeperiod}
                  timeperiod={timeperiod}
                />
                <ChartStack
                  data={tablesData}
                  setTimeperiod={setTimeperiod}
                  timeperiod={timeperiod}
                  bgcolor={backgroundColors}
                />

                {/* <GaugeContainer
                width={200}
                height={200}
                startAngle={-110}
                endAngle={110}
                value={30} // Pass the gauge value to the GaugeContainer
              >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer />{" "}
                {/* Uses the value from the GaugeContainer's context */}
                {/* </GaugeContainer> */}
              </div>
            </div>

            {/*  <!-- Pie Chart --> */}
            <div className="col-xl-4">
              <div className="card shadow mb-4">
                {/*  <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Production Componentwise
                  </h6>
                  <div className="dropdown no-arrow">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div className="dropdown-header">Dropdown Header:</div>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
                {/*  <!-- Card Body --> */}
                <div className="card-body">
                  <div className="chart-pie pt-4 pb-2">
                    <DonutChart
                      totalOG1={totalOG1}
                      totalOG2={totalOG2}
                      totalOG3={totalOG3}
                      totalOG4={totalOG4}
                    />
                    <div></div>
                  </div>
                </div>
              </div>
              <AMFgauge amf1={amf1per} amf2={amf2per} />
            </div>
          </div>
          <div
            style={{ display: "flex", marginTop: "-20vh", marginBottom: "5vh" }}
          >
            <div className="col-xl-8">
              <EnergyComp className="col-xl-8" />
            </div>

            <div className="col-xl-4">
              <WeatherWidget className="col-xl-4" />
              <AI />
            </div>
          </div>

          {/*   <!-- Content Row --> */}
          <div className="row">
            {/*   <!-- Content Column --> */}

            <div className="col-lg-12 mb-4">
              {/* <!-- Illustrations --> */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Illustrations
                  </h6>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    {/* <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                    src="img/undraw_posting_photo.svg"
                    alt="..."
                  /> */}
                    <MySankeyChart />
                  </div>

                  <a target="_blank" rel="nofollow" href="https://undraw.co/">
                    Decide the flow
                  </a>
                </div>
              </div>

              {/* <!-- Approach --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
