import React, { useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import TimeBar from "../TRFF/TimePeriod";
import DateRangeSelector from "./Daterangeselector";
import ToggleButtons from "./Togglesampling";
import ExportToExcelButton from "../export2excel";

const ReportModal = ({
  open,
  onClose,
  onSubmit,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeperiod,
  setTimeperiod,
  dateRange,
  setDateRange,
  data, // Pass data for export
  filename, // Pass filename for export
}) => {
  const [dataType, setDataType] = useState("EB Power");
  const [format, setFormat] = useState("PDF");
  const [range, setRange] = useState("");

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleSubmit = () => {
    if (format === "Excel") {
      // Trigger the Excel export function
      ExportToExcelButton({
        data,
        filename: filename || "table_report.xlsx",
        startDatetime: startDate,
        endDatetime: endDate,
      });
    } else {
      // Handle PDF or other formats
      onSubmit({ dataType, format, range });
    }
    onClose();
  };

  return (
    <Dialog
      sx={{ width: "60vw", marginLeft: "auto", marginRight: "auto" }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Generate Report</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "2vh" }}
      >
        <div>
          <FormLabel component="legend">Source Data Type</FormLabel>
          <TimeBar
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            dateRange={dateRange}
            setDateRange={setDateRange}
            setTimeperiod={setTimeperiod}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div>
          <FormLabel component="legend">Source Data Type</FormLabel>
          <DateRangeSelector
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
        <div>
          <FormLabel component="legend">Source Data Type</FormLabel>
          <ToggleButtons
            dateRange={dateRange}
            timeperiod={timeperiod}
            setTimeperiod={setTimeperiod}
          />
        </div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Format</FormLabel>
          <RadioGroup
            value={format}
            onChange={handleFormatChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
            <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportModal;
