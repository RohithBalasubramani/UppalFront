import React from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";
import { ReactComponent as DownloadIcon } from "../Assets/reporticon.svg";
import dayjs from "dayjs"; // Make sure you have dayjs installed: npm install dayjs

const ExportButton = styled.button`
  font-family: "DM Sans";
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #fff;
  background-color: #6b3ceb;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const ExportToExcelButton = ({
  data,
  filename,
  startDatetime,
  endDatetime,
}) => {
  const handleExportExcel = () => {
    if (!data || data.length === 0) {
      console.warn("No data available for export.");
      return;
    }

    // Convert the datetime to string format
    const formattedStartDatetime = dayjs(startDatetime).format(
      "DD/MM/YYYY HH:mm:ss"
    );
    const formattedEndDatetime = dayjs(endDatetime).format(
      "DD/MM/YYYY HH:mm:ss"
    );

    // Extract column names dynamically based on the first data object
    const columnNames = Object.keys(data[0]).filter(
      (key) => key !== "timestamp" && key !== "id"
    );

    // Format the data for export
    const formattedData = data.map((row) => {
      const formattedRow = {
        Timeseries: new Date(row.timestamp).toLocaleDateString("en-GB"),
        ...columnNames.reduce((acc, key) => {
          acc[key] = row[key] || "";
          return acc;
        }, {}),
      };
      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Add merged cells for "From Datetime", "To Datetime"
    worksheet["!merges"] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: columnNames.length + 1 } }, // Merge "From Datetime"
      { s: { r: 1, c: 1 }, e: { r: 1, c: columnNames.length + 1 } }, // Merge "To Datetime"
    ];

    // Insert the header rows with the correct datetime values
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ["From Datetime", formattedStartDatetime],
        ["To Datetime", formattedEndDatetime],
        ["Timeseries", ...columnNames],
      ],
      { origin: "A1" }
    );

    // Move the data down three rows to fit under the header
    XLSX.utils.sheet_add_json(worksheet, formattedData, {
      skipHeader: true,
      origin: "A4",
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, filename || "table_report.xlsx");
  };

  return (
    <ExportButton onClick={handleExportExcel}>
      <DownloadIcon style={{ marginRight: "8px" }} />
      Export to Excel
    </ExportButton>
  );
};

export default ExportToExcelButton;
