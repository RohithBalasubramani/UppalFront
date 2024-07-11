import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import dayjs from "dayjs";

const TimeBar = ({ dateRange, setStartDate, setDateRange, setEndDate }) => {
  console.log(dateRange);

  const updateDateRange = (range) => {
    setDateRange(range);
    const today = dayjs();
    switch (range) {
      case "today":
        setStartDate(today.startOf("day"));
        setEndDate(today);
        break;
      case "lastWeek":
        setStartDate(today.subtract(7, "day").startOf("day"));
        setEndDate(today);
        break;
      case "lastMonth":
        setStartDate(today.subtract(1, "month").startOf("day"));
        setEndDate(today);
        break;
      case "lastYear":
        setStartDate(today.subtract(1, "year").startOf("day"));
        setEndDate(today);
        break;
      default:
        setStartDate(today.startOf("day"));
        setEndDate(today);
        break;
    }
  };

  return (
    <div>
      <FormControl component="fieldset" sx={{ display: "flex" }}>
        <FormLabel component="legend">Select Date Range</FormLabel>
        <RadioGroup
          row
          aria-label="date-range"
          name="dateRange"
          value={dateRange}
          onChange={(e) => updateDateRange(e.target.value)}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="today" control={<Radio />} label="Today" />
          <FormControlLabel
            value="lastWeek"
            control={<Radio />}
            label="Last Week"
          />
          <FormControlLabel
            value="lastMonth"
            control={<Radio />}
            label="Last Month"
          />
          <FormControlLabel
            value="lastYear"
            control={<Radio />}
            label="Last Year"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default TimeBar;
