import React, { useState, useRef, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import HabitTabs from "./tabs";
import Day from "./day";
import HabitRenderer from "./HabitRenderer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "./Table";
import {
  images,
  type,
  initialMorningHabitRenderer,
  initialAfterNoonRenderer,
  initialEveningRenderer,
  initialAnyTimeRenderer,
} from "./list";
const Page = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  // const [activeHabits, setActiveHabits] = useState(
  //   localStorage.getItem("activeHabits")
  //     ? JSON.parse(localStorage.getItem("activeHabits"))
  //     : {}
  // );
  const [date, setDate] = useState(new Date());
  const currentDate = new Date();

  const [expanded, setExpanded] = useState(false);
  const [afterNoonEx, setAfterNoonEx] = useState(false);
  const [eveningEx, setEveningEx] = useState(false);
  const [anyTimeEx, setAnyTimeEx] = useState(false);

  const [newImg, setNewImg] = useState("");
  const [newHabit, setNewHabit] = useState("");

  const [newImgAfternoon, setNewImgAfternoon] = useState("");
  const [newHabitAfternoon, setNewHabitAfternoon] = useState("");

  const [newImgEvening, setNewImgEvening] = useState("");
  const [newHabitEvening, setNewHabitEvening] = useState("");

  const [newImgAnytime, setNewImgAnytime] = useState("");
  const [newHabitAnytime, setNewHabitAnytime] = useState("");

  const [habitOption, setHabitOption] = useState("");
  const [habitOptionAfternoon, setHabitOptionAfternoon] = useState("");
  const [habitOptionEvening, setHabitOptionEvening] = useState("");
  const [habitOptionAnytime, setHabitOptionAnytime] = useState("");

  const dayElementRef = useRef(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [openMorningDialog, setOpenMorningDialog] = useState(false);
  const [openAfterNoonDialog, setOpenAfterNoonDialog] = useState(false);
  const [openEveningDialog, setOpenEveningDialog] = useState(false);
  const [openAnyTimeDialog, setOpenAnyTimeDialog] = useState(false);
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const isAddingHabitRef = useRef(false);
  const useCheckedHabits = (localStorageKey) => {
    const [checkedHabits, setCheckedHabits] = useState(() => {
      const storedCheckedItems = localStorage.getItem(localStorageKey);
      return storedCheckedItems ? JSON.parse(storedCheckedItems) : {};
    })
    return [checkedHabits, setCheckedHabits];
  }
  const [checkedHabits, setCheckedHabits] = useCheckedHabits("morningCheckedItems");
  const [checkedAHabits, setCheckedAHabits] = useCheckedHabits("afternoonCheckedItems");
  const [checkedEHabits, setCheckedEHabits] = useCheckedHabits("eveningCheckedItems");
  const [checkedAnyTimeHabits, setCheckedAnyTimeHabits] = useCheckedHabits("anyTimeCheckedItems");

  const useHabitRenderer = (localStorageKey, initialHabits) => {
    const [habits, setHabits] = useState(() => {
      const storedHabits = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      return [...initialHabits, ...storedHabits];
    });
    return [habits, setHabits];
  }
  const [morningHabitRenderer, setMorningHabitRenderer] = useHabitRenderer("newMorningHabits", initialMorningHabitRenderer);
  const [afterNoonHabitRenderer, setAfterNoonHabitRenderer] = useHabitRenderer("newAfternoonHabits", initialAfterNoonRenderer);
  const [eveningHabitRenderer, setEveningHabitRenderer] = useHabitRenderer("newEveningHabits", initialEveningRenderer);
  const [anyTimeHabitRender, setAnyTimeHabitRender] = useHabitRenderer("newAnytimeHabits", initialAnyTimeRenderer);
  const getCombinedHabits = (initialHabits, localStorageKey) => {
    const storedHabits =
        JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const habitSet = new Set([
      ...initialHabits.map((habit) => JSON.stringify(habit)),
      ...storedHabits.map((habit) => JSON.stringify(habit)),
    ]);
    const combinedHabits = [...habitSet].map((habitString) =>
        JSON.parse(habitString)
    );
    return combinedHabits;
  };
  const newArray = [
    ...getCombinedHabits(morningHabitRenderer),
    ...getCombinedHabits(afterNoonHabitRenderer),
    ...getCombinedHabits(eveningHabitRenderer),
    ...getCombinedHabits(anyTimeHabitRender),
  ];
  const combinedRenderer = getCombinedHabits(newArray);
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
  // const getCombinedRendererHabit = (renderer, index, combinedRenderer) => {
  //   const morningHabitName = renderer[index]?.habit;
  //   const matchingCombinedHabits = combinedRenderer.find(habit => habit.habit === morningHabitName);
  //   return matchingCombinedHabits ? matchingCombinedHabits.habit : null;
  // }
  const handleCardClick = (dayOfWeek, index, morningHabitRenderer, setClickedHabitIndex, localStorageKey) => {
    const selectedHabit = morningHabitRenderer[index];
    // const combination = combinedRenderer;
    // const selectedHabit = getCombinedRendererHabit(morningHabitRenderer, index, combination);
    setClickedHabitIndex((prevClickedHabits) => {
      const updatedCheckedHabits = { ...prevClickedHabits };
      let habitsForDay = updatedCheckedHabits[dateKey] || [];
      if(selectedHabit && habitsForDay.includes(selectedHabit.habit)) {
        updatedCheckedHabits[dateKey] = habitsForDay.filter(
            (habit) => habit !== selectedHabit.habit
        );
      } else {
        updatedCheckedHabits[dateKey] = [
          ...habitsForDay,
          selectedHabit ? selectedHabit.habit : "",
        ];
      }
      localStorage.setItem(localStorageKey, JSON.stringify(updatedCheckedHabits));
      return updatedCheckedHabits;
    });
  };
  const handleOpenMorningDialog = () => {
    setOpenMorningDialog(true);
  };
  const handleCloseMorningDialog = () => {
    setCheckedHabits([]);
    setClickedHabitIndex([]);
    setHabitOption("");
    setOpenMorningDialog(false);
    localStorage.removeItem("morningCheckedItems");
    localStorage.removeItem("clickedHabitIndex");
  };
  const handleSubmitMorningDialog = () => {
    setOpenMorningDialog(false);
    localStorage.setItem("morningCheckedItems", JSON.stringify(checkedHabits));
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
    setCheckedAHabits([]);
    setClickedAfterNoonHabitIndex([]);
    setHabitOptionAfternoon("");
    setOpenAfterNoonDialog(false);
    localStorage.removeItem("afternoonCheckedItems");
    localStorage.removeItem("clickedAfterNoonHabitIndex");
  };
  const handleSubmitAfterNoonDialog = () => {
    setOpenAfterNoonDialog(false);
    localStorage.setItem("afternoonCheckedItems", JSON.stringify(checkedAHabits));
  };
  const handleEveningExClick = () => {
    setEveningEx(!eveningEx);
  };
  const handleOpenEveningDialog = () => {
    setOpenEveningDialog(true);
  };
  const handleCloseEveningDialog = () => {
    setCheckedEHabits([]);
    setClickedEveningHabitIndex([]);
    setHabitOptionEvening("");
    setOpenEveningDialog(false);
    localStorage.removeItem("eveningCheckedItems");
    localStorage.removeItem("clickedEveningHabitIndex");
  };
  const handleSubmitEveningDialog = () => {
    setOpenEveningDialog(false);
    localStorage.setItem("eveningCheckedItems", JSON.stringify(checkedEHabits));
  };
  const handleAnyTimeExClick = () => {
    setAnyTimeEx(!anyTimeEx);
  };
  const handleOpenAnyTimeDialog = () => {
    setOpenAnyTimeDialog(true);
  };
  const handleCloseAnyTimeDialog = () => {
    setCheckedAnyTimeHabits([]);
    setClickedAnyTimeHabitIndex([]);
    setHabitOptionAnytime("");
    setOpenAnyTimeDialog(false);
    localStorage.removeItem("anyTimeCheckedItems");
    localStorage.removeItem("clickedAnyTimeHabitIndex");
  };
  const handleSubmitAnyTimeDialog = () => {
    setOpenAnyTimeDialog(false);
    localStorage.setItem("anyTimeCheckedItems", JSON.stringify(checkedAnyTimeHabits));
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
  const handleDateElementClick = () => {
    setIsCalendarOpen(true);
  }
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
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
  const weekDays = getCurrentWeekDays(habitOption);
  function getMonth(date) {
    const options = { month: "short" };
    return date.toLocaleString("en-US", options);
  }
  function getNextMonthDate(date, index) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + index);

    const dayOfMonth = currentDate.getDate();

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate());
    const nextDayOfMonth = nextDate.getDate();

    let nextMonth = getMonth(nextDate);

    if (nextDayOfMonth === 1) {
      nextMonth = getMonth(nextDate);
    }
    return { dayOfMonth, nextMonth };
  }
  const getInitialHabits = (targetRenderer) => {
    switch(targetRenderer) {
      case "Morning":
        return initialMorningHabitRenderer;
      case "Afternoon":
        return initialAfterNoonRenderer;
      case "Evening":
        return initialEveningRenderer;
      case "Anytime":
        return initialAnyTimeRenderer;
      default:
        return [];
    }
  }
  const updateHabits = (targetRenderer, newHabitData) => {
    const storedHabits = JSON.parse(localStorage.getItem(`new${targetRenderer}Habits`)) || [];
    const habitExists = storedHabits.some(habit => JSON.stringify(habit) === JSON.stringify(newHabitData));
    if(!habitExists) {
      const updatedHabitsData = [...storedHabits, newHabitData];
      localStorage.setItem(`new${targetRenderer}Habits`, JSON.stringify(updatedHabitsData));
      const latestHabitsData = JSON.parse(localStorage.getItem(`new${targetRenderer}Habits`));
      const initialHabits = getInitialHabits(targetRenderer);
      const mergedHabits = [...initialHabits, ...latestHabitsData];
        switch(targetRenderer) {
          case "Morning":
            setMorningHabitRenderer(mergedHabits);
            break;
          case "Afternoon":
            setAfterNoonHabitRenderer(mergedHabits);
            break;
          case "Evening":
            setEveningHabitRenderer(mergedHabits);
            break;
          case "Anytime":
            setAnyTimeHabitRender(mergedHabits);
            break;
          default:
            return 'Error';
        }
      } else {
        console.log("Habit already exists.");
    }
  };
  const handleAddNewHabitClick = (targetHabitRenderer, newImg, setNewImg, newHabit, setNewHabit) => {
    if (newImg.trim() !== "" && newHabit.trim() !== "" && !isAddingHabitRef.current) {
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
  const handleOptionChange = (habitOption, setHabitOption, event) => {
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
      if(!habitsForDay.includes(selectedHabit.habit)) {
          updatedCheckedHabits[dateKey] = [
            ...(updatedCheckedHabits[dateKey] || []),
            selectedHabit.habit,
          ];
        }
        updatedCheckedHabits[dayKey] = Array.from(
            new Set([...(updatedCheckedHabits[dayKey] || []), selectedHabit.habit])
        )
      }
  };
  const handleCheckboxClick = (
    index,
    setCheckedHabits,
    morningHabitRenderer,
    habitOption
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
            updatedCheckedHabits[dayKey] = habitsForDay.filter(
                (habit) => habit !== selectedHabit.habit
            )
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
  const isMobileResponsive = useMediaQuery("(max-width: 600px)");
  // useEffect(() => {
  //   localStorage.clear();
  // }, [])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="main">
        <HabitTabs
          handleTabChange={handleTabChange}
          selectedTab={selectedTab}
        />
        {selectedTab === 0 && (
          <>
            <Day
              date={date}
              dayElementRef={dayElementRef}
              isCalendarOpen={isCalendarOpen}
              handleDateChange={handleDateChange}
              handleDateElementClick={handleDateElementClick}
              handleCalendarClose={handleCalendarClose}
              handlePreviousDayClick={handlePreviousDayClick}
              handleNextDayClick={handleNextDayClick}
              isMobileResponsive={isMobileResponsive}
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
                handleCheckboxClick(
                  index,
                  setCheckedHabits,
                  morningHabitRenderer,
                  habitOption
                )
              }
              dateKey={dateKey}
              dayKey={dayKey}
              clickedIndex={clickedHabitIndex}
              checkedHabits={checkedHabits}
              handleAddNewHabitClick={() => handleAddNewHabitClick("Morning", newImg, setNewImg, newHabit, setNewHabit)}
              newHabit={newHabit}
              setNewHabit={setNewHabit}
              newImg={newImg}
              setNewImg={setNewImg}
              handleCancelClick={handleCancelClick}
              habitOption={habitOption}
              handleOptionChange={(event) =>
                handleOptionChange(habitOption, setHabitOption, event)
              }
              handleCardClick={(dayOfWeek, index) =>
                handleCardClick(dayOfWeek, index, morningHabitRenderer, setClickedHabitIndex, "clickedHabitIndex")
              }
              isMobileResponsive={isMobileResponsive}
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
              handleAddNewHabitOpen={handleAddNewHabitOpen}
              habitRenderer={afterNoonHabitRenderer}
              handleCheckboxClick={(index) =>
                handleCheckboxClick(
                  index,
                  setCheckedAHabits,
                  afterNoonHabitRenderer,
                  habitOptionAfternoon
                )
              }
              dateKey={dateKey}
              dayKey={dayKey}
              clickedIndex={clickedAfterNoonHabitIndex}
              checkedHabits={checkedAHabits}
              handleAddNewHabitClick={() => handleAddNewHabitClick("Afternoon", newImgAfternoon, setNewImgAfternoon, newHabitAfternoon, setNewHabitAfternoon)}
              newHabit={newHabitAfternoon}
              setNewHabit={setNewHabitAfternoon}
              newImg={newImgAfternoon}
              setNewImg={setNewImgAfternoon}
              handleCancelClick={handleCancelClick}
              habitOption={habitOptionAfternoon}
              handleOptionChange={(event) =>
                handleOptionChange(
                  habitOptionAfternoon,
                  setHabitOptionAfternoon,
                  event
                )
              }
              handleCardClick={(dayOfWeek, index) =>
                handleCardClick(dayOfWeek, index, afterNoonHabitRenderer, setClickedAfterNoonHabitIndex, "clickedAfterNoonHabitIndex")
              }
              isMobileResponsive={isMobileResponsive}
            />
            <HabitRenderer
              open={openEveningDialog}
              handleOpenDialog={handleOpenEveningDialog}
              close={handleCloseEveningDialog}
              handleSubmit={handleSubmitEveningDialog}
              img={images[2].src}
              type={type[2]}
              expanded={eveningEx}
              handleExpandIconClick={handleEveningExClick}
              isAddingHabit={isAddingHabit}
              handleAddNewHabitOpen={handleAddNewHabitOpen}
              habitRenderer={eveningHabitRenderer}
              handleCheckboxClick={(index) =>
                handleCheckboxClick(
                  index,
                  setCheckedEHabits,
                  eveningHabitRenderer,
                  habitOptionEvening
                )
              }
              dateKey={dateKey}
              dayKey={dayKey}
              clickedIndex={clickedEveningHabitIndex}
              checkedHabits={checkedEHabits}
              handleAddNewHabitClick={() => handleAddNewHabitClick("Evening", newImgEvening, setNewImgEvening, newHabitEvening, setNewHabitEvening)}
              newHabit={newHabitEvening}
              setNewHabit={setNewHabitEvening}
              newImg={newImgEvening}
              setNewImg={setNewImgEvening}
              handleCancelClick={handleCancelClick}
              habitOption={habitOptionEvening}
              handleOptionChange={(event) =>
                handleOptionChange(
                  habitOptionEvening,
                  setHabitOptionEvening,
                  event
                )
              }
              handleCardClick={(dayOfWeek, index) =>
                handleCardClick(dayOfWeek, index, eveningHabitRenderer, setClickedEveningHabitIndex, "clickedEveningHabitIndex")
              }
              isMobileResponsive={isMobileResponsive}
            />
            <HabitRenderer
              open={openAnyTimeDialog}
              handleOpenDialog={handleOpenAnyTimeDialog}
              close={handleCloseAnyTimeDialog}
              handleSubmit={handleSubmitAnyTimeDialog}
              img={images[3].src}
              type={type[3]}
              expanded={anyTimeEx}
              handleExpandIconClick={handleAnyTimeExClick}
              isAddingHabit={isAddingHabit}
              handleAddNewHabitOpen={handleAddNewHabitOpen}
              habitRenderer={anyTimeHabitRender}
              handleCheckboxClick={(index) =>
                handleCheckboxClick(
                  index,
                  setCheckedAnyTimeHabits,
                  anyTimeHabitRender,
                  habitOptionAnytime
                )
              }
              dateKey={dateKey}
              dayKey={dayKey}
              clickedIndex={clickedAnyTimeHabitIndex}
              checkedHabits={checkedAnyTimeHabits}
              handleAddNewHabitClick={() => handleAddNewHabitClick("Anytime", newImgAnytime, setNewImgAnytime, newHabitAnytime, setNewHabitAnytime)}
              newHabit={newHabitAnytime}
              setNewHabit={setNewHabitAnytime}
              newImg={newImgAnytime}
              setNewImg={setNewImgAnytime}
              handleCancelClick={handleCancelClick}
              habitOption={habitOptionEvening}
              handleOptionChange={(event) =>
                handleOptionChange(
                  habitOptionAnytime,
                  setHabitOptionAnytime,
                  event
                )
              }
              handleCardClick={(dayOfWeek, index) =>
                handleCardClick(dayOfWeek, index, anyTimeHabitRender, setClickedAnyTimeHabitIndex, "clickedAnyTimeHabitIndex")
              }
              isMobileResponsive={isMobileResponsive}
            />
          </>
        )}
        {selectedTab === 1 && (
          <div className="table-style">
            <Table
              currentDate={currentDate}
              getNextMonthDate={getNextMonthDate}
              weekDays={weekDays}
              isMobileResponsive={isMobileResponsive}
              combinedRenderer={combinedRenderer}
              clickedHabitIndex={clickedHabitIndex}
            />
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default Page;
