import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import style from "./page.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState, useRef } from "react";
import HabitTabs from "./tabs";
import Day from "./day";
import HabitRenderer from "./HabitRenderer";
import {
  images,
  type,
  initialMorningHabitRenderer,
  initialAfterNoonRenderer,
  initialEveningRenderer,
  initialAnyTimeRenderer,
} from "./list";
const Page = () => {
  const initialState = {};
  type.map((habitType) => {
    initialState[habitType.toLowerCase()] = [];
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const [activeHabits, setActiveHabits] = useState(
    localStorage.getItem("activeHabits")
      ? JSON.parse(localStorage.getItem("activeHabits"))
      : {}
  );

  const [date, setDate] = useState(new Date());

  const [expanded, setExpanded] = useState(false);
  const [afterNoonEx, setAfterNoonEx] = useState(false);
  const [eveningEx, setEveningEx] = useState(false);
  const [anyTimeEx, setAnyTimeEx] = useState(false);
  const [newImg, setNewImg] = useState("");
  const [newHabit, setNewHabit] = useState("");
  const [habitOption, setHabitOption] = useState("");

  const dayElementRef = useRef(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [openMorningDialog, setOpenMorningDialog] = useState(false);
  const [openAfterNoonDialog, setOpenAfterNoonDialog] = useState(false);
  const [openEveningDialog, setOpenEveningDialog] = useState(false);
  const [openAnyTimeDialog, setOpenAnyTimeDialog] = useState(false);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const isAddingHabitRef = useRef(false);
  const [checkedHabits, setCheckedHabits] = useState(() => {
    const storedMorningCheckedItems = localStorage.getItem(
      "morningCheckedItems"
    );
    return storedMorningCheckedItems
      ? JSON.parse(storedMorningCheckedItems)
      : {};
  });
  const [checkedAHabits, setCheckedAHabits] = useState(() => {
    const storedAfternoonCheckedItems = localStorage.getItem(
      "afternoonCheckedItems"
    );
    return storedAfternoonCheckedItems
      ? JSON.parse(storedAfternoonCheckedItems)
      : {};
  });
  const [morningHabitRenderer, setMorningHabitRenderer] = useState(() => {
    const storedHabits =
      JSON.parse(localStorage.getItem("newMorningHabits")) || [];
    const combinedHabits = [...initialMorningHabitRenderer, ...storedHabits];

    return combinedHabits;
  });
  const [afterNoonHabitRenderer, setAfterNoonHabitRenderer] = useState(() => {
    const storedHabits =
      JSON.parse(localStorage.getItem("newAfternoonHabits")) || [];
    const combinedHabits = [...initialAfterNoonRenderer, ...storedHabits];

    return combinedHabits;
  });
  const [eveningHabitRenderer, setEveningHabitRenderer] = useState(() => {
    const storedHabits =
      JSON.parse(localStorage.getItem("newEveningHabits")) || [];
    const combinedHabits = [...initialEveningRenderer, ...storedHabits];

    return combinedHabits;
  });
  const [anyTimeHabitRender, setAnyTimeHabitRender] = useState(() => {
    const storedHabits =
      JSON.parse(localStorage.getItem("newAnyTimeHabits")) || [];
    const combinedHabits = [...initialAnyTimeRenderer, storedHabits];

    return combinedHabits;
  });
  const [clickedHabitIndex, setClickedHabitIndex] = useState(
    JSON.parse(localStorage.getItem("clickedHabitIndex")) || {}
  );
  const [clickedAfterNoonHabitIndex, setClickedAfterNoonHabitIndex] = useState(
    JSON.parse(localStorage.getItem("clickedAfterNoonHabitIndex")) || {}
  );
  const [clickedEveningHabitIndex, setClickedEveningHabitIndex] = useState(
    JSON.parse(localStorage.getItem("clickedEveningHabitIndex")) || {}
  );
  const [clickedAnyTimeHabitIndex, setClickedAnyTimeHabitIndex] = useState(
    JSON.parse(localStorage.getItem("clickedAnyTimeHabitIndex")) || {}
  );
  const handleOpenMorningDialog = (event) => {
    setOpenMorningDialog(true);
  };
  const handleCloseMorningDialog = () => {
    setCheckedHabits([]);
    setClickedHabitIndex([]);
    setOpenMorningDialog(false);
    localStorage.removeItem("morningCheckedItems");
    localStorage.removeItem("clickedHabitIndex");
  };
  const handleSubmitMorningDialog = () => {
    setOpenMorningDialog(false);
  };
  const handleExpandIconClick = () => {
    setExpanded(!expanded);
  };
  const handleAfterNoonExClick = () => {
    setAfterNoonEx(!afterNoonEx);
  };
  const handleOpenAfterNoonDialog = () => {
    setOpenAfterNoonDialog(true);
  };
  const handleCloseAfterNoonDialog = () => {
    setAfterNoonHabitRenderer([]);
    setClickedAfterNoonHabitIndex([]);
    setOpenAfterNoonDialog(false);
    localStorage.removeItem("afterNoonCheckedItems");
    localStorage.removeItem("clickedAfterNoonHabitIndex");
  };
  const handleSubmitAfterNoonDialog = () => {
    setOpenAfterNoonDialog(false);
  };
  const handleEveningExClick = () => {
    setEveningEx(!eveningEx);
  };
  const handleOpenEveningDialog = () => {
    setOpenEveningDialog(true);
  };
  const handleCloseEveningDialog = () => {
    setEveningHabitRenderer([]);
    setClickedEveningHabitIndex([]);
    setOpenEveningDialog(false);
    localStorage.removeItem("eveningCheckedItems");
    localStorage.removeItem("clickedEveningHabitIndex");
  };
  const handleSubmitEveningDialog = () => {
    setOpenEveningDialog(false);
  };
  const handleAnyTimeExClick = () => {
    setAnyTimeEx(!anyTimeEx);
  };
  const handleOpenAnyTimeDialog = () => {
    setOpenAnyTimeDialog(true);
  };
  const handleCloseAnyTimeDialog = () => {
    setAnyTimeHabitRender([]);
    setClickedAnyTimeHabitIndex([]);
    setOpenAnyTimeDialog(false);
    localStorage.removeItem("anyTimeCheckedItems");
    localStorage.removeItem("clickedAnyTimeHabitIndex");
  };
  const handleSubmitAnyTimeDialog = () => {
    setOpenAnyTimeDialog(false);
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
  const currentDate = new Date();
  const getCurrentWeekDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDayIndex = currentDate.getDay();
    let weekDays = days
      .slice(currentDayIndex)
      .concat(days.slice(0, currentDayIndex))
      .map((day, index) => {
        const date = new Date();
        date.setDate(currentDate.getDate() + index);
        return {
          day,
          dateKey: `${day}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`,
        };
      });
    return weekDays;
  };
  const updateHabits = (targetRenderer, newHabitData) => {
    const storedHabits =
      JSON.parse(localStorage.getItem(`new${targetRenderer}Habits`)) || [];
    const updatedHabitsData = [...storedHabits, newHabitData];
    localStorage.setItem(
      `new${targetRenderer}Habits`,
      JSON.stringify(updatedHabitsData)
    );

    switch (targetRenderer) {
      case "Morning":
        setMorningHabitRenderer(updatedHabitsData);
        break;
      case "Afternoon":
        setAfterNoonHabitRenderer(updatedHabitsData);
        break;
      case "Evening":
        setEveningHabitRenderer(updatedHabitsData);
        break;
      case "Anytime":
        setAnyTimeHabitRender(updatedHabitsData);
        break;
      default:
        break;
    }
  };
  const handleAddNewHabitClick = (targetHabitRenderer) => {
    if (
      newImg.trim() !== "" &&
      newHabit.trim() !== "" &&
      !isAddingHabitRef.current
    ) {
      isAddingHabitRef.current = true;
      const newHabitData = {
        img: newImg,
        habit: newHabit,
      };
      updateHabits(targetHabitRenderer, newHabitData);
      setNewImg("");
      setNewHabit("");
      isAddingHabitRef.current = false;
    }
    setIsAddingHabit(false);
  };
  const handleAddNewHabitOpen = () => {
    setIsAddingHabit(true);
  };
  const handleCancelClick = () => {
    setIsAddingHabit(false);
    setNewImg("");
    setNewHabit("");
    // localStorage.removeItem("newHabits");
    // localStorage.removeItem("newMorningHabits");
  };
  const handleOptionChange = (event) => {
    if (habitOption === event.target.value) {
      setHabitOption("");
    } else {
      setHabitOption(event.target.value);
    }
  };
  const day = date.toLocaleString("en-US", { weekday: "short" });
  let dayKey = date.toLocaleString("en-US", { weekday: "short" });
  let dateKey = `${day}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
  const handleCheckLogic = (
    dayKey,
    updatedCheckedHabits,
    selectedHabit,
    habitsForDay,
    dateKey,
    diff,
    newDate
  ) => {
    if (!updatedCheckedHabits[dayKey]) {
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
        ];
      }
      updatedCheckedHabits[dayKey] = Array.from(
        new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
      );
    }
  };

  const handleCheckboxClick = (
    index,
    setCheckedHabits,
    morningHabitRenderer
  ) => {
    const selectedHabit = morningHabitRenderer[index];
    setCheckedHabits((prevCheckedHabits) => {
      const updatedCheckedHabits = { ...prevCheckedHabits };
      let habitsForDay = updatedCheckedHabits[dateKey] || [];
      let newDate = new Date();
      let day = newDate.getDay();
      let diff;
      switch (habitOption) {
        case "Monday":
          diff = day < 1 ? 1 - day : 8 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
          break;
        case "Tuesday":
          diff = day <= 2 ? 2 - day : 9 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
          break;
        case "Wednesday":
          diff = day <= 3 ? 3 - day : 10 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
          break;
        case "Thursday":
          diff = day <= 4 ? 4 - day : 11 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
          break;
        case "Friday":
          diff = day <= 5 ? 5 - day : 12 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
          break;
        case "Saturday":
          diff = day <= 6 ? 6 - day : 13 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
          break;
        case "Sunday":
          diff = day <= 0 ? 0 - day : 7 - day;
          handleCheckLogic(
            dayKey,
            updatedCheckedHabits,
            selectedHabit,
            habitsForDay,
            dateKey,
            diff,
            newDate
          );
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
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={style.main}>
        <HabitTabs
          handleTabChange={handleTabChange}
          selectedTab={selectedTab}
        />
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
          <HabitRenderer
            open={openMorningDialog}
            handleOpenDialog={handleOpenMorningDialog}
            close={handleCloseMorningDialog}
            handleSubmit={handleSubmitMorningDialog}
            img={images[0].src}
            type={type[0]}
            expanded={expanded}
            handleExpandIconClick={handleExpandIconClick}
            isAddingHabit={isAddingHabit}
            handleAddNewHabitOpen={handleAddNewHabitOpen}
            habitRenderer={morningHabitRenderer}
            handleCheckboxClick={(index) =>
              handleCheckboxClick(index, setCheckedHabits, morningHabitRenderer)
            }
            dateKey={dateKey}
            dayKey={dayKey}
            clickedIndex={clickedHabitIndex}
            checkedHabits={checkedHabits}
            handleAddNewHabitClick={() => handleAddNewHabitClick("Morning")}
            newHabit={newHabit}
            setNewHabit={setNewHabit}
            newImg={newImg}
            setNewImg={setNewImg}
            handleCancelClick={handleCancelClick}
            habitOption={habitOption}
            handleOptionChange={handleOptionChange}
          />
          <HabitRenderer
            open={openAfterNoonDialog}
            handleOpenDialog={handleOpenAfterNoonDialog}
            close={handleCloseAfterNoonDialog}
            handleSubmit={handleSubmitAfterNoonDialog}
            img={images[1].src}
            type={type[1]}
            expanded={afterNoonEx}
            handleExpandIconClick={handleAfterNoonExClick}
            isAddingHabit={isAddingHabit}
            habitRenderer={afterNoonHabitRenderer}
            handleCheckboxClick={(index) =>
              handleCheckboxClick(
                index,
                setCheckedAHabits,
                afterNoonHabitRenderer
              )
            }
            dateKey={dateKey}
            dayKey={dayKey}
            clickedIndex={clickedAfterNoonHabitIndex}
            checkedHabits={checkedAHabits}
            handleAddNewHabitClick={() => handleAddNewHabitClick("Afternoon")}
            newHabit={newHabit}
            setNewHabit={setNewHabit}
            newImg={newImg}
            setNewImg={setNewImg}
            handleCancelClick={handleCancelClick}
            habitOption={habitOption}
            handleOptionChange={handleOptionChange}
          />
          {/*<HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[2].src} type={type[2]} expanded={eveningEx} handleExpandIconClick={handleEveningExClick} />*/}
          {/*<HabitRenderer open={openMorningDialog} close={handleCloseMorningDialog} img={images[3].src} type={type[3]} expanded={anyTimeEx} handleExpandIconClick={handleAnyTimeExClick} />*/}
        </>
      )}
    </LocalizationProvider>
  );
};

export default Page;
