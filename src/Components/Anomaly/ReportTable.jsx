import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TableReport = ({ tablesData }) => {
  if (!tablesData || tablesData.length === 0) {
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6
            className="m-0 font-weight-bold text-primary"
            style={{ textTransform: "capitalize" }}
          >
            Table Data
          </h6>
        </div>
        <div className="card-body">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <TableContainer component={Paper} className="card shadow mb-4">
      <div className="card-header py-3">
        <h6
          className="m-0 font-weight-bold text-primary"
          style={{ textTransform: "capitalize" }}
        >
          Table Data
        </h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <Table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <TableHead>
              <TableRow>
                {Object.keys(tablesData[0]).map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tablesData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {/* Check if it's a date to apply date-time formatting */}
                      {typeof value === "object" && value instanceof Date
                        ? value.toLocaleString()
                        : value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TableContainer>
  );
};

export default TableReport;
