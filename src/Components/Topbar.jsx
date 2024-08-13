import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Badge, IconButton } from "@mui/material";
import AlertPanel from "./Alert";
import { NotificationsOutlined } from "@mui/icons-material";

const TopbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  margin-bottom: 15vh;
  background-color: ${(props) =>
    `rgba(255, 255, 255, ${props.scrollPosition})`};
`;

const SearchForm = styled.form`
  display: flex;
  height: var(--height-h-10, 40px);
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  flex: 2.2;

  input {
    width: 50vw;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    color: #697483;
    border-radius: var(--Interactive-border-radius---radius-i-sm, 8px);
    border: 1px solid #e2e2e2;
    background: #fff;

    &::placeholder {
      color: #a6aab4;
    }
  }

  svg {
    margin-left: -30px;
    color: #a6aab4;
  }
`;

const TopbarMenu = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: auto;
  margin-right: 0%;
`;

const TopbarItem = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  position: relative;

  .dropdown-menu {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px;
    display: none;

    a {
      text-decoration: none;
      color: #697483;
      display: block;
      padding: 10px 20px;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }

  &:hover .dropdown-menu {
    display: block;
  }
`;

const AlertsButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid var(--Bluish-Purple-500, #6b3ceb);
  background-color: transparent;
  font-size: 14px;
  cursor: pointer;
  color: var(--Bluish-Purple-500, #6b3ceb);
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "DM Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #f5f7fa;
  }
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
`;

const Topbar = () => {
  const [isAlertPanelOpen, setAlertPanelOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  const handleScroll = () => {
    const position = window.scrollY;
    console.log("pos", position);
    const maxScroll = 5; // Adjust as needed
    const scrollRatio = Math.min(position / maxScroll, 1);
    setScrollPosition(scrollRatio);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAlertButtonClick = () => {
    setAlertPanelOpen(!isAlertPanelOpen);
  };

  return (
    <>
      <TopbarContainer scrollPosition={scrollPosition}>
        <SearchForm>
          <input
            type="text"
            placeholder="Ask our Embedded AI for Advanced Graphs and Smart Analytics..."
          />
        </SearchForm>

        <TopbarMenu>
          <TopbarItem>
            <Badge
              badgeContent={3}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#5630BC", // Custom secondary color
                  color: "white", // Color of the text in the badge
                },
              }}
            >
              <AlertsButton onClick={handleAlertButtonClick}>
                <NotificationsOutlined fontSize="small" />
                Alerts
              </AlertsButton>
            </Badge>
          </TopbarItem>
          <TopbarItem>
            <IconButton>
              <UserAvatar>DN</UserAvatar>
            </IconButton>
          </TopbarItem>
        </TopbarMenu>
      </TopbarContainer>
      <AlertPanel isOpen={isAlertPanelOpen} onClose={handleAlertButtonClick} />
    </>
  );
};

export default Topbar;
