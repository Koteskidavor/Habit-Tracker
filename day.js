import React from "react";
import "./day.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Popover } from "@mui/material";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Day = ({
  date,
  handlePreviousDayClick,
  handleNextDayClick,
  handleDateElementClick,
  dayElementRef,
  isCalendarOpen,
  handleDateChange,
  handleCalendarClose,
  isMobileResponsive,
}) => {
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return (
    <div className="main">
      <div className={isMobileResponsive ? "date-responsive date" : "date"}>
        <ArrowBackIcon onClick={handlePreviousDayClick} />
        <div>
          <div onClick={handleDateElementClick} ref={dayElementRef}>
            {dayOfWeek}, {dayOfMonth} {month}
          </div>
          <Popover
            open={isCalendarOpen}
            onClose={handleCalendarClose}
            anchorReference="anchorEl"
            anchorEl={dayElementRef.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Calendar value={date} onChange={handleDateChange} />
          </Popover>
        </div>
        <ArrowForwardIcon onClick={handleNextDayClick} />
      </div>
    </div>
  );
};

export default Day;
