import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerIcon from "@mui/icons-material/Power";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StorageIcon from "@mui/icons-material/Storage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Logo from "../Assets/logo.png";

const Sidebar = () => {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
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
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/#/"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa">
                <img
                  src={Logo}
                  style={{
                    width: "8vh",
                    height: "8vh",
                    transform: `rotate(${15}deg)`,
                  }}
                />
              </i>
            </div>
            <div className="sidebar-brand-text mx-3">
              M<sup>2</sup> Admin Dashboard{" "}
            </div>
          </a>

          {/*   <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/*  <!-- Nav Item - Dashboard --> */}
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              <DashboardIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">Energy Sources</div>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsetrf1"
              aria-expanded="true"
              aria-controls="collapsetrf1"
            >
              <SettingsInputComponentIcon
                fontSize="small"
                style={{ color: "white" }}
              />
              <span style={{ marginLeft: "5px" }}>Energy Sources</span>
            </a>
            <div
              id="collapsetrf1"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Panels</h6>
                <Link to="/eb" className="collapse-item">
                  <PowerIcon fontSize="small" style={{ color: "black" }} />
                  <span style={{ marginLeft: "5px" }}>EB Power</span>
                </Link>
                <Link to="/dg1" className="collapse-item">
                  <BatteryChargingFullIcon
                    fontSize="small"
                    style={{ color: "black" }}
                  />
                  <span style={{ marginLeft: "5px" }}>Diesel Generator 1</span>
                </Link>
                <Link to="/dg2" className="collapse-item">
                  <BatteryChargingFullIcon
                    fontSize="small"
                    style={{ color: "black" }}
                  />
                  <span style={{ marginLeft: "5px" }}>Diesel Generator 2</span>
                </Link>
                {/* <Link className="collapse-item" to="/trf1feeders">
                  <ElectricalServicesIcon
                    fontSize="small"
                    style={{ color: "black" }}
                  />
                  <span style={{ marginLeft: "5px" }}>TRF1 Panel A</span>
                </Link> */}
                {/* <Link className="collapse-item" to="/trf1feedersb">
                  <ElectricalServicesIcon
                    fontSize="small"
                    style={{ color: "black" }}
                  />
                  <span style={{ marginLeft: "5px" }}>TRF1 Panel B</span>
                </Link> */}
              </div>
            </div>
          </li>

          <hr className="sidebar-divider" />

          {/*   <!-- Heading --> */}
          <div className="sidebar-heading">Feeders</div>

          <li className="nav-item">
            <Link to="/skyde" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Skyde</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/utility" className="nav-link">
              <StorageIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Utility</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sparestation3" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Spare Station 3</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/zoho" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Zoho</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sparestation5" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Spare Station 5</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sparestation6" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Spare Station 6</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sparestation7" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Spare Station 7</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/kotak" className="nav-link">
              <LocationCityIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Kotak</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/solar" className="nav-link">
              <WbSunnyIcon fontSize="small" style={{ color: "white" }} />
              <span style={{ marginLeft: "5px" }}>Solar</span>
            </Link>
          </li>

          {/*  <!-- Divider --> */}
          <hr className="sidebar-divider" />

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
