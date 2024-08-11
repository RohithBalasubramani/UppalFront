import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerIcon from "@mui/icons-material/Power";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import StorageIcon from "@mui/icons-material/Storage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Logo from "../Assets/logo.png";
import "./sidebar.css"; // Adjust the path to your custom.css file
import styled from "styled-components";
import { Margin } from "@mui/icons-material";

const Container = styled.div`
  height: 200vh;
  position: static;
  padding: 2vh;
`;

const Sidebar = () => {
  const location = useLocation();

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
    <Container>
      <ul className={style} id="accordionSidebar">
        {/*  <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand  d-flex align-items-center justify-content-center"
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
          <div className="sidebar-brand-text mx-3">Therion </div>
        </a>

        {/*   <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/*  <!-- Nav Item - Dashboard --> */}
        <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            <DashboardIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Energy Sources</div>

        <li
          className={`nav-item ${location.pathname === "/eb" ? "active" : ""}`}
        >
          <Link to="/eb" className="nav-link">
            <PowerIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>EB Power</span>
          </Link>
        </li>
        <li
          className={`nav-item ${location.pathname === "/dg1" ? "active" : ""}`}
        >
          <Link to="/dg1" className="nav-link">
            <BatteryChargingFullIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Diesel Generator 1</span>
          </Link>
        </li>
        <li
          className={`nav-item ${location.pathname === "/dg2" ? "active" : ""}`}
        >
          <Link to="/dg2" className="nav-link">
            <BatteryChargingFullIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Diesel Generator 2</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/*   <!-- Heading --> */}
        <div className="sidebar-heading">Feeders</div>

        <li
          className={`nav-item ${
            location.pathname === "/skyde" ? "active" : ""
          }`}
        >
          <Link to="/skyde" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Skyde</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/utility" ? "active" : ""
          }`}
        >
          <Link to="/utility" className="nav-link">
            <StorageIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Utility</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/sparestation3" ? "active" : ""
          }`}
        >
          <Link to="/sparestation3" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Spare Station 3</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/zoho" ? "active" : ""
          }`}
        >
          <Link to="/zoho" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Zoho</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/sparestation5" ? "active" : ""
          }`}
        >
          <Link to="/sparestation5" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Spare Station 5</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/sparestation6" ? "active" : ""
          }`}
        >
          <Link to="/sparestation6" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Spare Station 6</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/sparestation7" ? "active" : ""
          }`}
        >
          <Link to="/sparestation7" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Spare Station 7</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/kotak" ? "active" : ""
          }`}
        >
          <Link to="/kotak" className="nav-link">
            <LocationCityIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Kotak</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/solar" ? "active" : ""
          }`}
        >
          <Link to="/solar" className="nav-link">
            <WbSunnyIcon fontSize="small" />
            <span style={{ marginLeft: "5px" }}>Solar</span>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div
          className="text-center d-none d-md-inline"
          style={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}
        >
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={changeStyle}
            style={{
              backgroundColor: "#697483",
              color: "#697483",
              opacity: "0.8",
            }}
          ></button>
        </div>
      </ul>
    </Container>
  );
};

export default Sidebar;
