import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import style from "./page.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState, useRef } from "react";
import HabitTabs from "./tabs";
import Day from "./day";
import HabitRenderer from './HabitRenderer';
import { images, type, initialMorningHabitRenderer, initialAfterNoonRenderer, initialEveningRenderer, initialAnyTimeRenderer } from './list';
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

    const [habitOption, setHabitOption] = useState('');

    const dayElementRef = useRef(null);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [openMorningDialog, setOpenMorningDialog] = useState(false);
    const [openAfterNoonDialog, setOpenAfterNoonDialog] = useState(false);
    const [openEveningDialog, setOpenEveningDialog] = useState(false);
    const [openAnyTimeDialog, setOpenAnyTimeDialog] = useState(false);
    const [isAddingHabit, setIsAddingHabit] = useState(false);
    const [checkedHabits, setCheckedHabits] = useState(() => {
        const storedMorningCheckedItems = localStorage.getItem("morningCheckedItems");
        return storedMorningCheckedItems ? JSON.parse(storedMorningCheckedItems) : {};
    })
    const [morningHabitRenderer, setMorningHabitRenderer] = useState(() => {
        const storedHabits = JSON.parse(localStorage.getItem("newMorningHabits")) || [];
        const combinedHabits = [...initialMorningHabitRenderer, ...storedHabits];

        return combinedHabits;
    });
    const handleOpenMorningDialog = (event) => {
        setOpenMorningDialog(true);
    }
    const handleCloseMorningDialog = () => {
        // setCheckedHabits([])
        // setClickedIndex([]);
        setOpenMorningDialog(false)
    }
    const handleSubmitMorningDialog = () => {
        setOpenMorningDialog(false);
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
    const handleAddNewHabitClick = () => {
    // I will make this later:
        setIsAddingHabit(false);
    }
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
    const currentDate = new Date();
    const getCurrentWeekDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const currentDayIndex = currentDate.getDay();
        let weekDays = days.slice(currentDayIndex).concat(days.slice(0, currentDayIndex)).map((day, index) => {
            const date = new Date();
            date.setDate(currentDate.getDate() + index);
            return {
                day,
                dateKey: `${day}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`,
            }
        });
        return weekDays;
    }
    const updateHabits = (targetRenderer, newHabitData) => {
        const storedHabits = JSON.parse(localStorage.getItem(`new${targetRenderer}Habits`)) || [];
        const updatedHabitsData = [...storedHabits, newHabitData];
        localStorage.setItem(`new${targetRenderer}Habits`, JSON.stringify(updatedHabitsData));

        switch (targetRenderer) {
            case 'Morning':
                setMorningHabitRenderer(updatedHabitsData);
                break;
            // case 'Afternoon':
        }
    }
    const handleOptionChange = (event) => {
        if(habitOption === event.target.value) {
            setHabitOption('');
        } else {
            setHabitOption(event.target.value);
        }
    }
    let dayKey = getCurrentWeekDays()[0].day;
    let dateKey = getCurrentWeekDays()[0].dateKey;
    const handleCheckLogic = (dayKey, updatedCheckedHabits, selectedHabit, habitsForDay, dateKey, diff, newDate) => {
        if(!updatedCheckedHabits[dayKey]) {
            newDate.setDate(newDate.getDate() + diff);
            dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
            habitsForDay = updatedCheckedHabits[dayKey] || [];
        }
        if (selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
            updatedCheckedHabits[dayKey] = habitsForDay.filter(
                (habit) => habit !== selectedHabit.habit
            );
            updatedCheckedHabits[dateKey] = habitsForDay.filter(
                (habit) => habit !== selectedHabit.habit
            );
        } else {
            if (!habitsForDay.includes(selectedHabit.habit)) {
                updatedCheckedHabits[dateKey] = [
                    ...(updatedCheckedHabits[dateKey] || []),
                    selectedHabit.habit,
                ]
            }
            updatedCheckedHabits[dayKey] = Array.from(
                new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
            )
        }
    }
    const handleCheckboxClick = (index) => {
        const selectedHabit = morningHabitRenderer[index];
        setCheckedHabits((prevCheckedHabits) => {
            const updatedCheckedHabits = { ...prevCheckedHabits };
            let habitsForDay = updatedCheckedHabits[dateKey] || [];
            let newDate = new Date();
            let day = newDate.getDay();
            let diff;
            switch(habitOption) {
                case "Monday":
                    if(!updatedCheckedHabits[dayKey]) {
                        diff = (day < 1) ? 1 - day : 8 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if(selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                    } else {
                        if (!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits[dateKey] || []),
                                selectedHabit.habit,
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                case "Tuesday":
                    if(!updatedCheckedHabits[dayKey]) {
                        diff = day <= 2 ? 2 - day : 9 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if (selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                    } else {
                        if(!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits[dateKey] || []),
                                selectedHabit.habit,
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                case "Wednesday":
                    if(!updatedCheckedHabits[dayKey]) {
                        diff = day <= 3 ? 3 - day : 10 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if(selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        )
                    } else {
                        if(!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits[dateKey] || []),
                                selectedHabit.habit,
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                case "Thursday":
                    if(!updatedCheckedHabits[dayKey]) {
                        diff = day <= 4 ? 4 - day : 11 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if (selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        )
                    } else {
                        if(!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits[dateKey] || []),
                                selectedHabit.habit,
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                case 'Friday':
                    if(!updatedCheckedHabits[dayKey]) {
                        diff = day <= 5 ? 5 - day : 12 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if(selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        )
                    } else {
                        if (!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits || []),
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                case 'Saturday':
                    if(!updatedCheckedHabits[dayKey]) {
                        diff = (day <= 6) ? 6 - day : 13 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if(selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        )
                    } else {
                        if (!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits || []),
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                case 'Sunday':
                    if(!updatedCheckedHabits) {
                        diff = (day <= 0) ? 0 - day : 7 - day;
                        newDate.setDate(newDate.getDate() + diff);
                        dayKey = newDate.toLocaleString("en-US", { weekday: "short" });
                        habitsForDay = updatedCheckedHabits[dayKey] || [];
                    }
                    if (selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dayKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        )
                    } else {
                        if(!habitsForDay.includes(selectedHabit.habit)) {
                            updatedCheckedHabits[dateKey] = [
                                ...(updatedCheckedHabits[dateKey] || []),
                                selectedHabit.habit,
                            ]
                        }
                        updatedCheckedHabits[dayKey] = Array.from(
                            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
                        )
                    }
                    break;
                default:
                    if (selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
                        updatedCheckedHabits[dateKey] = habitsForDay.filter(
                            (habit) => habit !== selectedHabit.habit
                        );
                    } else {
                        updatedCheckedHabits[dateKey] = [
                            ...habitsForDay,
                            selectedHabit ? selectedHabit.habit : "",
                        ];
                    }
                    break;
            }
            return updatedCheckedHabits;
        })
    }
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
                    <HabitRenderer open={openMorningDialog}
                                   handleOpenDialog={handleOpenMorningDialog}
                                   close={handleCloseMorningDialog}
                                   handleSubmit={handleSubmitMorningDialog}
                                   img={images[0].src}
                                   type={type[0]}
                                   expanded={expanded}
                                   handleExpandIconClick={handleExpandIconClick}
                                   isAddingHabit={isAddingHabit}
                                   habitRenderer={morningHabitRenderer}
                                   handleCheckboxClick={handleCheckboxClick}
                                   dateKey={dateKey}
                                   dayKey={dayKey}
                                   checkedHabits={checkedHabits}
                    />
                    {/*<HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[1].src} type={type[1]} expanded={afterNoonEx} handleExpandIconClick={handleAfterNoonExClick} />*/}
                    {/*<HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[2].src} type={type[2]} expanded={eveningEx} handleExpandIconClick={handleEveningExClick} />*/}
                    {/*<HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[3].src} type={type[3]} expanded={anyTimeEx} handleExpandIconClick={handleAnyTimeExClick} />*/}
                </>
            )}
        </LocalizationProvider>
    )
}

export default Page;