import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import style from "./page.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState, useRef } from "react";
import HabitTabs from "./tabs";
import Day from "./day";
import HabitRenderer from './HabitRenderer';
import { images, type } from './list';

const Page = () => {
    const initialState = {};
    type.map((habitType) => {
        initialState[habitType.toLowerCase()] = [];
    })

    const [selectedTab, setSelectedTab] = useState(0);

    const [activeHabits, setActiveHabits] = useState(localStorage.getItem("activeHabits") ? JSON.parse(localStorage.getItem("activeHabits")) : {});

    const [date, setDate] = useState(new Date());

    const [expanded, setExpanded] = useState(false);
    const [afterNoonEx, setAfterNoonEx] = useState(false);
    const [eveningEx, setEveningEx] = useState(false);
    const [anyTimeEx, setAnyTimeEx] = useState(false);

    const dayElementRef = useRef(null);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [openMorningDialog, setOpenMorningDialog] = useState(false);

    const handleOpenMorningDialog = (event) => {
        setOpenMorningDialog(true);
    }
    const handleCloseMorningDialog = () => {
        // setCheckedHabits([])
        // setClickedIndex([]);
        setOpenMorningDialog(false)
    }
    const handleExpandIconClick = () => {
        setExpanded(!expanded);
    };
    const handleAfterNoonExClick = () => {
        setAfterNoonEx(!afterNoonEx);
    };
    const handleEveningExClick = () => {
        setEveningEx(!eveningEx);
    };
    const handleAnyTimeExClick = () => {
        setAnyTimeEx(!anyTimeEx);
    };
    const handlePreviousDayClick = () => {
        const previousDay = new Date(date);
        previousDay.setDate(previousDay.getDate() - 1);
        setDate(previousDay);
    };
    const handleNextDayClick = () => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setDate(nextDay);
    };
    const handleCalendarClose = () => {
        setIsCalendarOpen(false);
    };

    const handleDateChange = (date) => {
        setDate(date);
        handleCalendarClose();
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={style.main}>
                <HabitTabs handleTabChange={handleTabChange} selectedTab={selectedTab}/>
            </div>
            {selectedTab === 0 && (
                <>
                    <Day
                        date={date}
                        dayElementRef={dayElementRef}
                        isCalendarOpen={isCalendarOpen}
                        handleDateChange={handleDateChange}
                        handleCalendarClose={handleCalendarClose}
                        handlePreviousDayClick={handlePreviousDayClick}
                        handleNextDayClick={handleNextDayClick}
                    />
                    <HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[0].src} type={type[0]} expanded={expanded} handleExpandIconClick={handleExpandIconClick} />
                    <HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[1].src} type={type[1]} expanded={afterNoonEx} handleExpandIconClick={handleAfterNoonExClick} />
                    <HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[2].src} type={type[2]} expanded={eveningEx} handleExpandIconClick={handleEveningExClick} />
                    <HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[3].src} type={type[3]} expanded={anyTimeEx} handleExpandIconClick={handleAnyTimeExClick} />
                </>
            )}
        </LocalizationProvider>
    )
}

export default Page;