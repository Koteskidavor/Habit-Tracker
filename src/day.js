import React, { useState, useRef} from "react";
import style from "./day.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Popover} from "@mui/material";
import Calendar from "react-calendar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Day = ({ date, handlePreviousDayClick, handleNextDayClick, handleDateElementClick, dayElementRef, isCalendarOpen, handleDateChange, handleCalendarClose }) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return (
        <div className={style.main}>
            <div
                style={{
                    color: "#C1C2C5",
                    alignItems: "center",
                    display: "flex",
                    width: "15vw",
                    justifyContent: "space-between",
                }}
            >
                <ArrowBackIcon onClick={handlePreviousDayClick}/>
                <div style={{ position: "relative" }}>
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
                        <Calendar value={date} onChange={handleDateChange}/>
                    </Popover>
                </div>
                <ArrowForwardIcon onClick={handleNextDayClick}/>
            </div>
        </div>
    )
};

export default Day;