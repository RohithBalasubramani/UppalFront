import React from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";

const PanelContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) =>
    props.isOpen ? "0" : "-300px"}; /* Adjust width as needed */
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  padding: 20px;
`;

const Title = styled.div`
  color: var(--Gray---Typography-800, #1b2533);
  font-feature-settings: "liga" off, "clig" off;

  /* Paragraph/text-md/[S] */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PanelContent = styled.div`
  overflow-y: auto;
`;

const Date = styled.div`
  color: var(--Gray-500, #98a2b3);
  font-feature-settings: "liga" off, "clig" off;

  /* Paragraph/text-xs/[R] */
  font-family: "DM Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
`;

const Content = styled.div`
  color: #000;
  font-feature-settings: "liga" off, "clig" off;

  /* Paragraph/text-sm/[R] */
  font-family: "DM Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const AlertIcon = styled(DescriptionIcon)`
  margin-right: 10px;
  color: #8f97a2;
  background-color: #f6f6f7;
  padding: 5px;
  border-radius: 16px;
  font-size: 400rem;
`;

const AlertText = styled.div`
  color: #000;
  font-feature-settings: "liga" off, "clig" off;

  /* Paragraph/text-sm/[R] */
  font-family: "DM Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const AlertPanel = ({ isOpen, onClose }) => {
  return (
    <PanelContainer isOpen={isOpen}>
      <PanelHeader>
        <Title>Alerts</Title>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </PanelHeader>
      <PanelContent>
        {[1, 2, 3].map((alert, index) => (
          <AlertItem key={index}>
            <AlertIcon size="large" />
            <AlertText>
              <Date>July 15, 2024</Date>
              <Content>A new Monthly report is ready to Download!</Content>
            </AlertText>
            <hr />
          </AlertItem>
        ))}
      </PanelContent>
    </PanelContainer>
  );
};

export default AlertPanel;
