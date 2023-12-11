import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import style from "./page.css";
import {LocalizationProvider} from "@mui/x-date-pickers";
import React, {useState} from "react";
import HabitTabs from "./tabs";
import Day from "./day";

const Page = () => {
    const frequency = ["Once", "Daily", "Weekend", "Everyday"];
    const type = ["Morning", "Afternoon", "Evening", "Anytime"];

    const initialState = {
      habits: {
          morning: [],
          afternoon: [],
          evening: [],
          anytime: [],
      }
    };

    const [selectedTab, setSelectedTab] = useState(0);

    const [activeHabits, setActiveHabits] = useState(localStorage.getItem("activeHabits") ? JSON.parse(localStorage.getItem("activeHabits")) : {});

    const [date, setDate] = useState(new Date());


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={style.main}>
                <HabitTabs handleTabChange={handleTabChange} selectedTab={selectedTab}/>
            </div>
            {selectedTab === 0 && (
                <Day  date={date} />
            )}
        </LocalizationProvider>
    )
}

export default Page;