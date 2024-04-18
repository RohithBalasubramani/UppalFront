import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

const TableAno = ({
  tablesData,
  orderBy,
  order,
  handleRequestSort,
  sortedData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  selectedEndpoint,
}) => {
  return (
    <TableContainer component={Paper} className="card shadow mb-4">
      <div className="card-header py-3">
        <h6
          className="m-0 font-weight-bold text-primary"
          style={{ textTransform: "capitalize" }}
        >
          {selectedEndpoint} Data
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
                {tablesData.length > 0 &&
                  Object.keys(tablesData[0]).map((header) => (
                    <TableCell key={header}>
                      <TableSortLabel
                        active={orderBy === header}
                        direction={orderBy === header ? order : "asc"}
                        onClick={() => handleRequestSort(header)}
                      >
                        {header}
                      </TableSortLabel>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.entries(row).map(([key, value], cellIndex) => (
                      <TableCell key={cellIndex}>
                        {/* Check if it's the first column to apply date-time formatting */}
                        {cellIndex === 1
                          ? new Date(value).toLocaleString()
                          : value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tablesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </TableContainer>
  );
};

export default TableAno;
