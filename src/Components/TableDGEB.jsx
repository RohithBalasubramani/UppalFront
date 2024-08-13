import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import styled from "styled-components";
import FilterListIcon from "@mui/icons-material/FilterList";
import ToggleButtons from "./Dashboard/Togglesampling"; // Update the path accordingly
import DateRangeSelector from "./Dashboard/Daterangeselector"; // Update the path accordingly
import TimeBar from "./TRFF/TimePeriod";
import ExportToExcelButton from "./export2excel";

// Styled components for table design
const StyledTableContainer = styled(TableContainer)`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
`;

const StyledTableCell = styled(TableCell)`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #445164;
  padding: 16px 24px;
  background-color: #fff;
  position: relative;
  border-right: none;
  border-left: none;
  width: 150px;

  &:before {
    content: "";
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0;
    width: 2px;
    background-color: #e0e0e0;
  }

  &:first-child {
    &:before {
      display: none;
    }
  }

  &:last-child {
    border-right: none;
  }
`;

const StyledTableHeader = styled(TableCell)`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #445164;
  background-color: #d6dae1;
  text-transform: capitalize;
  border-right: 1px solid #e0e0e0;
  padding: 16px 24px;
  border-bottom: 0px solid #ffffff;
  width: 150px;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-right: none;
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  &.MuiTableSortLabel-root {
    color: #444;
  }
  &.MuiTableSortLabel-active {
    color: #007bff;
  }
  & .MuiTableSortLabel-icon {
    opacity: 0.5;
  }
`;

const StyledTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    background-color: #000;
    &:hover {
      background-color: #ff0000;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const PageButton = styled.button`
  font-family: "DM Sans";
  width: 8vw;
  font-size: 0.875rem;
  margin: 0 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#007bff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#1B2533")};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#f0f0f0")};
  }
  &:disabled {
    color: #ccc;
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.button`
  font-family: "DM Sans";
  width: 2vw;
  font-size: 0.875rem;
  margin: 0 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#445164" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#1B2533")};
  opacity: ${(props) => (props.active ? "0.75" : "0.75")};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.active
      ? "0 2px 4px rgba(0, 0, 0, 0.1);"
      : "0 2px 4px rgba(0, 0, 0, 0);"};

  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.active ? "#445164" : "#f0f0f0")};
  }
  &:disabled {
    color: #ccc;
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  color: #444;
  margin-left: auto;
  margin-right: auto;
`;

const CardHeader = styled.div`
  padding: 16px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h6`
  margin: 0;
  font-family: "DM Sans", sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: #007bff;
  text-transform: capitalize;
`;

const FilterDropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 10vw;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  color: #444;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 10vw;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 1;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  width: 10vw;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 10vw;
`;

const CheckboxLabel = styled.label`
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  margin-left: 8px;
  color: #444;
  width: 10vw;
`;

const StyledRadioGroup = styled(RadioGroup)({
  display: "flex",
  gap: "16px", // Add space between radio buttons
  flexDirection: "column",
});

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  border: "1px solid #EAECF0",
  borderRadius: "8px", // Rounded corners
  margin: "0", // Remove margin between buttons
  padding: "1vh", // Padding for each button
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  display: "flex",
  backgroundColor: "#FFFFFF", // Default background color
  "& .MuiFormControlLabel-label": {
    fontFamily: "DM Sans",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px", // Line height as a string
    color: "#445164", // Custom text color
  },
  "& .MuiRadio-root": {
    padding: "0 8px", // Padding for radio icon
    color: "#445164", // Default color for unchecked
  },
  "& .MuiRadio-root.Mui-checked": {
    color: "#4E46B4", // Color when checked
  },
  "&:hover": {
    backgroundColor: "#F3F4F6", // Hover background
  },
}));

const DataTable = ({
  tablesData,
  orderBy,
  order,
  handleRequestSort,
  sortedData,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  selectedEndpoint,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeperiod,
  setTimeperiod,
  dateRange,
  setDateRange,
}) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(tablesData[0] || {}).reduce((acc, column) => {
      acc[column] = true; // Initially, all columns are visible
      return acc;
    }, {})
  );
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("All");

  const handleSortRequest = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
    handleRequestSort(column, isAsc ? "desc" : "asc");
  };

  const handleColumnVisibilityChange = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column], // Toggle column visibility
    }));
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterColumns = (column) => {
    if (column === "timestamp") {
      return true; // Always include the timestamp column
    }
    if (filter === "All") {
      return true;
    } else if (filter === "EB") {
      return column.endsWith("_eb");
    } else if (filter === "DG") {
      return !column.endsWith("_eb");
    }
  };

  const filteredColumns = Object.keys(tablesData[0] || {}).filter(
    (column) =>
      visibleColumns[column] && filterColumns(column) && column !== "id"
  );

  const filteredRows = sortedData.filter((row) => {
    return filteredColumns.some((column) =>
      String(row[column]).toLowerCase().includes("")
    );
  });

  const roundedRows = filteredRows.map((row) => {
    const roundedRow = {};
    filteredColumns.forEach((column) => {
      roundedRow[column] =
        typeof row[column] === "number" ? row[column].toFixed(2) : row[column];
    });
    return roundedRow;
  });

  const sortedRows = roundedRows.slice().sort((a, b) => {
    if (b[sortColumn] < a[sortColumn]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    if (b[sortColumn] > a[sortColumn]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    return 0;
  });

  if (!tablesData || tablesData.length === 0) {
    return <div>No data available</div>;
  }

  const totalPages = Math.ceil(tablesData.length / rowsPerPage);

  const renderPageNumbers = () => {
    const pageButtons = [];
    const maxButtons = 3;

    if (totalPages <= maxButtons * 2 + 1) {
      for (let i = 0; i < totalPages; i++) {
        pageButtons.push(
          <PageNumber
            key={i}
            active={page === i}
            onClick={() => handleChangePageInternal(null, i)}
          >
            {i + 1}
          </PageNumber>
        );
      }
    } else {
      let start = Math.max(0, page - maxButtons);
      let end = Math.min(totalPages, page + maxButtons + 1);

      if (start > 0) {
        pageButtons.push(
          <PageNumber
            key="start"
            onClick={() => handleChangePageInternal(null, 0)}
          >
            1
          </PageNumber>
        );
        if (start > 1) {
          pageButtons.push(<span key="start-ellipsis">...</span>);
        }
      }

      for (let i = start; i < end; i++) {
        pageButtons.push(
          <PageNumber
            key={i}
            active={page === i}
            onClick={() => handleChangePageInternal(null, i)}
          >
            {i + 1}
          </PageNumber>
        );
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pageButtons.push(<span key="end-ellipsis">...</span>);
        }
        pageButtons.push(
          <PageNumber
            key="end"
            active={page === totalPages - 1}
            onClick={() => handleChangePageInternal(null, totalPages - 1)}
          >
            {totalPages}
          </PageNumber>
        );
      }
    }

    return pageButtons;
  };

  const handleChangePageInternal = (event, newPage) => {
    setPage(newPage);
    handleChangePage(event, newPage);
  };

  return (
    <>
      <div className="stacked-bar-container">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="row">
              <div className="title">Energy Consumption by Source</div>
              <div className="controls">
                <TimeBar
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  setTimeperiod={setTimeperiod}
                  startDate={startDate}
                  endDate={endDate}
                />
                <DateRangeSelector
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
                <FilterDropdown>
                  <FilterButton onClick={toggleFilter}>
                    <FilterListIcon />
                    <span>Filter Columns</span>
                  </FilterButton>
                  <DropdownContent show={showFilter}>
                    {Object.keys(tablesData[0]).map((column) => (
                      <CheckboxContainer key={column}>
                        <input
                          type="checkbox"
                          checked={visibleColumns[column]}
                          onChange={() => handleColumnVisibilityChange(column)}
                        />
                        <CheckboxLabel>{column}</CheckboxLabel>
                      </CheckboxContainer>
                    ))}
                  </DropdownContent>
                </FilterDropdown>
              </div>
            </div>
            <div className="row">
              <ToggleButtons
                dateRange={dateRange}
                timeperiod={timeperiod}
                setTimeperiod={setTimeperiod}
              />

              <FormControl component="fieldset">
                <StyledRadioGroup
                  value={filter}
                  onChange={handleFilterChange}
                  aria-label="Power Source"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <StyledFormControlLabel
                    value="All"
                    control={<Radio />}
                    label="All"
                  />
                  <StyledFormControlLabel
                    value="EB"
                    control={<Radio />}
                    label="EB Power"
                  />
                  <StyledFormControlLabel
                    value="DG"
                    control={<Radio />}
                    label="DG Power"
                  />
                </StyledRadioGroup>
              </FormControl>
            </div>

            <StyledTableContainer component={Paper}>
              <div>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      {filteredColumns.map((header) => (
                        <StyledTableHeader key={header}>
                          <StyledTableSortLabel
                            active={sortColumn === header}
                            direction={sortOrder}
                            onClick={() => handleSortRequest(header)}
                          >
                            {header}
                          </StyledTableSortLabel>
                        </StyledTableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, rowIndex) => (
                        <StyledTableRow key={rowIndex}>
                          {filteredColumns.map((column) => (
                            <StyledTableCell key={column}>
                              {column === "timestamp"
                                ? new Date(row[column]).toLocaleString()
                                : row[column]}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </StyledTable>
              </div>
            </StyledTableContainer>
            <PaginationContainer>
              <PageButton
                onClick={(event) => handleChangePageInternal(event, page - 1)}
                disabled={page === 0}
              >
                ← Previous
              </PageButton>
              <PageIndicator>{renderPageNumbers()}</PageIndicator>
              <PageButton
                onClick={(event) => handleChangePageInternal(event, page + 1)}
                disabled={page >= totalPages - 1}
              >
                Next →
              </PageButton>
            </PaginationContainer>
          </div>
          <div className="d-flex justify-content-end mb-4">
            <ExportToExcelButton
              data={roundedRows} // Pass the rounded rows without the `id` column
              columns={filteredColumns} // Pass the filtered columns without the `id` column
              filename="table_report.xlsx"
              startDatetime={startDate}
              endDatetime={endDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
