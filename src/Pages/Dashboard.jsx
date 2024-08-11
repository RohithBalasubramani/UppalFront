import React, { useState } from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Footer from "../Components/Footer";
import "./Dashboard.css";

const Wrapper = styled.div`
  display: flex;

  height: 180vh;
  overflow: hidden;
`;

const FixedSidebar = styled.div`
  /* Adjust based on your sidebar width */
  position: static;
  background-color: #ffffff;

  height: 100%;
`;

const FixedTopBar = styled.div`
  /* Adjust based on your sidebar width */

  margin-top: 10vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  background: var(--Gray---Typography-25, #f6f6f7);
`;

function Dashboard() {
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

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
    <Wrapper>
      {/*  <!-- Sidebar --> */}
      <FixedSidebar>
        <Sidebar />
      </FixedSidebar>
      {/*  <!-- End of Sidebar --> */}
      <ContentWrapper>
        {/*  <!-- Topbar --> */}
        <FixedTopBar></FixedTopBar>
        <Topbar />

        {/*  <!-- End of Topbar --> */}
        <Outlet />
        {/*  <!-- Footer --> */}
        <Footer />
        {/*  <!-- End of Footer --> */}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Dashboard;
