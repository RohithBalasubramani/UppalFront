import React, { useState } from "react";

const Topbar = () => {
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
      {/*  <!-- Topbar --> */}
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* <!-- Sidebar Toggle (Topbar) --> */}
        <button
          id="sidebarToggleTop"
          class="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i class="fa fa-bars"></i>
        </button>

        {/* <!-- Topbar Search --> */}
        <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-300 navbar-search">
          <div
            class="input-group"
            style={{
              width: "60vw",
            }}
          >
            <input
              type="text"
              class="form-control bg-light border-0 small"
              placeholder="Ask our Embedded AI for Advanced Graphs and Smart Analytics..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button">
                <i class="fas fa fa-sm">AI</i>
              </button>
            </div>
          </div>
        </form>

        {/* <!-- Topbar Navbar --> */}
        <ul class="navbar-nav ml-auto">
          {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
          <li class="nav-item dropdown no-arrow d-sm-none">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-search fa-fw"></i>
            </a>
            {/* <!-- Dropdown - Messages --> */}
            <div
              class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form class="form-inline mr-auto w-100 navbar-search">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* <!-- Nav Item - Alerts --> */}
          <li class="nav-item dropdown no-arrow mx-1">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-bell fa-fw"></i>
              {/* <!-- Counter - Alerts --> */}
              <span class="badge badge-danger badge-counter">3+</span>
            </a>
            {/* <!-- Dropdown - Alerts --> */}
            <div
              class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="alertsDropdown"
            >
              <h6 class="dropdown-header">Alerts Center</h6>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                  <div class="icon-circle bg-primary">
                    <i class="fas fa-file-alt text-white"></i>
                  </div>
                </div>
                <div>
                  <div class="small text-gray-500">December 12, 2022</div>
                  <span class="font-weight-bold">
                    A new monthly report is ready to download!
                  </span>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                  <div class="icon-circle bg-success">
                    <i class="fas fa-donate text-white"></i>
                  </div>
                </div>
                <div>
                  <div class="small text-gray-500">December 7, 2022</div>
                  ₹2,95,069 has been spent on electricity so far
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                  <div class="icon-circle bg-warning">
                    <i class="fas fa-exclamation-triangle text-white"></i>
                  </div>
                </div>
                <div>
                  <div class="small text-gray-500">December 2, 2022</div>
                  Productivity Alert: We've noticed unusually the efficiency
                  drop, relative to planning.
                </div>
              </a>
              <a class="dropdown-item text-center small text-gray-500" href="#">
                Show All Alerts
              </a>
            </div>
          </li>

          {/* {% comment %} <!-- Nav Item - Messages --> */}
          <li class="nav-item dropdown no-arrow mx-1">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-envelope fa-fw"></i>
              {/* <!-- Counter - Messages --> */}
              <span class="badge badge-danger badge-counter">7</span>
            </a>
            {/* <!-- Dropdown - Messages --> */}
            <div
              class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="messagesDropdown"
            >
              <h6 class="dropdown-header">Message Center</h6>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                    alt=""
                  />
                  <div class="status-indicator bg-success"></div>
                </div>
                <div class="font-weight-bold">
                  <div class="text-truncate">
                    Hello! I'm facing a technical issue with the new solar panel
                    prototype. Can you assist me?
                  </div>
                  <div class="small text-gray-500">Rahul Kapoor · 58m</div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                    alt=""
                  />
                  <div class="status-indicator"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    We need to adjust the material sourcing for our next
                    project. Any suggestions?
                  </div>
                  <div class="small text-gray-500">Priya Sharma · 1d</div>
                </div>
              </a>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image mr-3">
                  <img
                    class="rounded-circle"
                    src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                    alt=""
                  />
                  <div class="status-indicator bg-warning"></div>
                </div>
                <div>
                  <div class="text-truncate">
                    How can we optimize the production process to reduce energy
                    consumption?
                  </div>
                  <div class="small text-gray-500">Vikram Singh · 2d</div>
                </div>
              </a>

              <a class="dropdown-item text-center small text-gray-500" href="#">
                Read More Messages
              </a>
            </div>
          </li>

          <div class="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li class="nav-item dropdown no-arrow">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                M<sup>2</sup> Admin
              </span>
              <img
                class="img-profile rounded-circle"
                src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
              />
            </a>
            {/* <!-- Dropdown - User Information --> */}
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a class="dropdown-item" href="#">
                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a class="dropdown-item" href="#">
                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a class="dropdown-item" href="#">
                <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div class="dropdown-divider"></div>
              <a
                class="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/*  <!-- End of Topbar --> */}
    </div>
  );
};

export default Topbar;
