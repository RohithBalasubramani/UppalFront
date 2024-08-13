/* import logo from './logo.svg'; */
import "./App.css";
// import "css/sb-admin-2.min.css";
// import "css/energycomp.css";
// import "css/weather.css";
import React from "react";
import Dashboard from "./Pages/Dashboard";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Indi from "./Pages/Indi";
import DashboardPage from "./Components/DashboardPage";
import Anomaly from "./Pages/Anomaly";
import AMF from "./Pages/Amf";
import TRFA from "./Pages/TRFA";
import TRFF from "./Pages/TRFF";
import OG1 from "./Pages/OG1";
import PCC1 from "./Pages/PCC1";
import OG2 from "./Pages/OG2";
import AMFDifference from "./Pages/AMFDIff";
import Feeders from "./Pages/Feeders";
import DGpage from "./Pages/DG";

const apiEndpoints = {
  cellltpanel1data: "https://sneems.org/pcc1/api/cellltpanel1data/",
  pcc1incomerdata: "https://sneems.org/pcc1/api/pcc1incomerdata/",
  ups1og1data: "https://sneems.org/pcc1/api/ups1og1data/",
  ups2og1data: "https://sneems.org/pcc1/api/ups2og1data/",
};

const endpointArray = Object.entries(apiEndpoints).map(([endpoint, url]) => ({
  endpoint,
  url,
}));

const apiEndpoints2 = {
  cellltpanel2data: "https://sneems.org/pcc1/api/cellltpanel2data/",
  // celltoolpdb1data: "https://sneems.org/pcc1/api/celltoolpdb1data/",
  pcc2incomerdata: "https://sneems.org/pcc1/api/pcc2incomerdata/",
  ups1og2data: "https://sneems.org/pcc1/api/ups1og2data/",
  ups2og2data: "https://sneems.org/pcc1/api/ups2og2data/",
};

const apiEndpointsTRFA = {
  upsincm1data: "https://sneems.org/mod1/api/upsincm1data/",
  upsincm2data: "https://sneems.org/mod1/api/upsincm2data/",
  upsincm3data: "https://sneems.org/mod1/api/upsincm3data/",
  upsincm4data: "https://sneems.org/mod1/api/upsincm4data/",
  upsincm5data: "https://sneems.org/mod1/api/upsincm5data/",
  cellltpanel1data: "https://sneems.org/pcc1/api/cellltpanel1data/",
  chiller2data: "https://sneems.org/pcc1/api/chiller2data/",
  celltoolpdb2data: "https://sneems.org/pcc1/api/celltoolpdb2data/",
};

const apiEndpointsTRFB = {
  ups1incomer1data: "https://sneems.org/cell1/api/ups1incomer1data/",
  ups1incomer2data: "https://sneems.org/cell1/api/ups1incomer2data/",
  ups1incomer3data: "https://sneems.org/cell1/api/ups1incomer3data/",
  ups1incomer4data: "https://sneems.org/cell1/api/ups1incomer4data/",
  ups1incomer5data: "https://sneems.org/cell1/api/ups1incomer5data/",
  ups1ltpanel1data: "https://sneems.org/cell1/api/ups1ltpanel1data/",
  cellltpanel1data: "https://sneems.org/cell1/api/cellltpanel1data/",
  celltoolpdb2data: "https://sneems.org/pcc1/api/celltoolpdb2data/",
};

const endpointArray2 = Object.entries(apiEndpoints2).map(([endpoint, url]) => ({
  endpoint,
  url,
}));

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/amf" element={<AMF />} />
          {/* <Route
            path="/amfdiff"
            element={
              <AMFDifference
                apiEndpoints={apiEndpointsTRFA}
                apiEndpointsb={apiEndpointsTRFA}
              />
            }
          /> */}
          {/* <Route path="/indi" element={<Indi />} /> */}
          <Route path="/anomaly" element={<Anomaly />} />
          <Route
            path="/eb"
            element={<TRFA source={"eb"} heading={"EB Energy Source"} />}
          />
          <Route
            path="/dg1"
            element={<DGpage source={"dg1"} heading={"Diesel Generator 1"} />}
          />
          <Route
            path="/dg2"
            element={<DGpage source={"dg2"} heading={"Diesel Generator 2"} />}
          />

          <Route
            path="/skyde"
            element={<Feeders source={"skyde"} heading={"Skyde"} />}
          />
          <Route
            path="/utility"
            element={<Feeders source={"utility"} heading={"Utility"} />}
          />
          <Route
            path="/sparestation3"
            element={
              <Feeders source={"sparestation3"} heading={"Spare Station 3"} />
            }
          />
          <Route
            path="/zoho"
            element={<Feeders source={"zoho"} heading={"Zoho"} />}
          />
          <Route
            path="/sparestation5"
            element={
              <Feeders source={"sparestation5"} heading={"Spare Station 5"} />
            }
          />
          <Route
            path="/sparestation6"
            element={
              <Feeders source={"sparestation6"} heading={"Spare Station 6"} />
            }
          />
          <Route
            path="/sparestation7"
            element={
              <Feeders source={"sparestation7"} heading={"Spare Station 7"} />
            }
          />
          <Route
            path="/kotak"
            element={<Feeders source={"kotak"} heading={"Kotak"} />}
          />
          <Route
            path="/solar"
            element={<Feeders source={"solar"} heading={"Solar"} />}
          />

          <Route
            path="/trf1feeders"
            element={<TRFF apiEndpoints={apiEndpointsTRFA} />}
          />
          <Route
            path="/trf1feedersb"
            element={<TRFF apiEndpoints={apiEndpointsTRFB} />}
          />
          {/* <Route path="/og1" element={<OG1 />} /> */}
          {/* {endpointArray.map(({ endpoint, url }) => (
            <Route
              key={endpoint}
              path={`og1/${endpoint}`}
              element={<PCC1 endpoint={endpoint} url={url} />}
            />
          ))} */}
          {/* <Route path="/og2" element={<OG2 />} />
          {endpointArray2.map(({ endpoint, url }) => (
            <Route
              key={endpoint}
              path={`og2/${endpoint}`}
              element={<PCC1 endpoint={endpoint} url={url} />}
            />
          ))} */}
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
