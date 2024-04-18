import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import Footer from "../Components/Footer";
import DashboardPage from "../Components/DashboardPage";
import { Link, Outlet } from "react-router-dom";

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
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper" style={{ background: "#224ABE" }}>
          {/*  <!-- Sidebar --> */}
          <div style={{ height: "100%", background: "#224ABE" }}>
            <Sidebar />
          </div>

          {/*  <!-- End of Sidebar --> */}

          {/*  <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/*  <!-- Main Content --> */}
            <div id="content">
              {/*  <!-- Topbar --> */}
              <Topbar />

              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}

              {/* <Link to="/">
                <DashboardPage />
              </Link>
              <div>
                
              </div>
              <Link to="/Page1">
                <Pages1 />
              </Link>
              <Link to="/Page2">
                <Page2 />
              </Link> */}
              <Outlet />
              {/*   <!-- /.container-fluid --> */}
            </div>
            {/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
            <Footer />
            {/* <!-- End of Footer --> */}
          </div>
          {/*  <!-- End of Content Wrapper --> */}
        </div>
        {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/*  <!-- Logout Modal--> */}
        <div
          className="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="/#/login">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Dashboard;
