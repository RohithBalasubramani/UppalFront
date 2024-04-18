import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import Logo from "../Assets/premier-modified-removebg-preview.png";

const Sidebar = () => {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const apiEndpoints = {
    cellltpanel1data: "http://localhost:8000/pcc1/api/cellltpanel1data/",
    pcc1incomerdata: "http://localhost:8000/pcc1/api/pcc1incomerdata/",
    ups1og1data: "http://localhost:8000/pcc1/api/ups1og1data/",
    ups2og1data: "http://localhost:8000/pcc1/api/ups2og1data/",
  };

  const apiEndpoints2 = {
    // cellltpanel2data: "http://localhost:8000/pcc1/api/cellltpanel2data/",
    // celltoolpdb1data: "http://localhost:8000/pcc1/api/celltoolpdb1data/",
    pcc2incomerdata: "http://localhost:8000/pcc1/api/pcc2incomerdata/",
    ups1og2data: "http://localhost:8000/pcc1/api/ups1og2data/",
    ups2og2data: "http://localhost:8000/pcc1/api/ups2og2data/",
  };

  const changeStyle = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <div style={{ minHeight: "200vh" }}>
      <div>
        <ul className={style} id="accordionSidebar">
          {/*  <!-- Sidebar - Brand --> */}
          <a
            class="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div class="sidebar-brand-icon rotate-n-15">
              <i class="fas fa">
                <img src={Logo} style={{ width: "50px", height: "50px" }} />
              </i>
            </div>
            <div class="sidebar-brand-text mx-3">Premier Dashboard </div>
          </a>

          {/*   <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/*  <!-- Nav Item - Dashboard --> */}
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <hr class="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div class="sidebar-heading">Transformers</div>

          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsetrf1"
              aria-expanded="true"
              aria-controls="collapsetrf1"
            >
              <i class="fas fa-fw fa-chart-area"></i>
              <span>Transformer 1 Panels</span>
            </a>
            <div
              id="collapsetrf1"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Panel</h6>

                <Link to="/trf1assets" class="collapse-item">
                  Transformer 1
                </Link>
                <Link class="collapse-item" to="/trf1feeders">
                  TRF1 Panel A
                </Link>
                <Link class="collapse-item" to="/trf1feedersb">
                  TRF1 Panel B
                </Link>
              </div>
            </div>
          </li>

          {/*  <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/*   <!-- Heading --> */}
          <div className="sidebar-heading">Anomalies</div>

          <li class="nav-item">
            <Link to="/anomaly" class="nav-link">
              <i class="fas fa-fw">
                <ReportIcon />
              </i>
              <span>&nbsp;Anomalies</span>
            </Link>
          </li>

          {/*  <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/*   <!-- Heading --> */}
          <div className="sidebar-heading">Individual</div>

          {/*  <!-- Nav Item - Pages Collapse Menu --> */}
          <li class="nav-item">
            <Link
              class="nav-link collapsed"
              to="/og1"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i class="fas fa-fw fa-cog"></i>
              <span>OG 1</span>
            </Link>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Systems</h6>
                {Object.keys(apiEndpoints).map((endpointName, index) => (
                  <Link
                    key={index}
                    className="collapse-item"
                    to={`/og1/${endpointName}`}
                  >
                    {endpointName}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/*  <!-- Nav Item - Pages Collapse Menu --> */}
          <li class="nav-item">
            <Link
              class="nav-link collapsed"
              to="/og2"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              <i class="fas fa-fw fa-cog"></i>
              <span>OG 2</span>
            </Link>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Systems</h6>
                {Object.keys(apiEndpoints2).map((endpointName, index) => (
                  <Link
                    key={index}
                    className="collapse-item"
                    to={`/og2/${endpointName}`}
                  >
                    {endpointName}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}

          {/* <!-- Divider --> */}

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          {/* <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i class="fas fa-fw fa-folder"></i>
              <span>Pages</span>
            </a>
            <div
              id="collapsePages"
              class="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Login Screens:</h6>
                <a class="collapse-item" href="login.html">
                  Login
                </a>
                <a class="collapse-item" href="register.html">
                  Register
                </a>
                <a class="collapse-item" href="forgot-password.html">
                  Forgot Password
                </a>
                <div class="collapse-divider"></div>
                <h6 class="collapse-header">Other Pages:</h6>
                <a class="collapse-item" href="404.html">
                  404 Page
                </a>
                <a class="collapse-item" href="blank.html">
                  Blank Page
                </a>
              </div>
            </div>
          </li> */}

          {/* <!-- Nav Item - Charts --> */}

          {/*  <!-- Nav Item - Pages Collapse Menu --> */}
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePeppl"
              aria-expanded="true"
              aria-controls="collapsePeppl"
            >
              <i class="fas fa-fw fa-chart-area"></i>
              <span>PEPPL Data</span>
            </a>
            <div
              id="collapsePeppl"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Systems</h6>

                <Link to="/amf" class="collapse-item">
                  AMFs
                </Link>
                <Link class="collapse-item" to="/indi">
                  Individual Data
                </Link>
              </div>
            </div>
          </li>

          {/*  <!-- Nav Item - Pages Collapse Menu --> */}

          {/* <!-- Nav Item - Tables --> */}
          {/* <li class="nav-item">
            <a class="nav-link" href="tables.html">
              <i class="fas fa-fw fa-table"></i>
              <span>Tables</span>
            </a>
          </li> */}

          {/* <!-- Divider --> */}
          <hr class="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={changeStyle}
            ></button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
