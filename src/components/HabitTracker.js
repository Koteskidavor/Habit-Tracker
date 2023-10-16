import React, { useState, useRef, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers";
import { StaticDatePicker } from "@mui/x-date-pickers";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Popover, TextField, Button, Tab, Tabs, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DialogContext from "@mui/material/Dialog/DialogContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddHabit from './AddHabit';

const HabitTracker = () => {
  const [date, setDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dayElementRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [afterNoonEx, setAfterNoonEx] = useState(false);
  const [eveningEx, setEveningEx] = useState(false);
  const [anyTimeEx, setAnyTimeEx] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openMorningDialog, setOpenMorningDialog] = useState(false);
  const [morningCheckedItems, setMorningCheckedItems] = useState([]);
  const [openAfterNoonDialog, setOpenAfterNoonDialog] = useState(false);
  const [afterNoonCheckedItems, setAfterNoonCheckedItems] = useState([]);
  const [openEveningDialog, setOpenEveningDialog] = useState(false);
  const [eveningCheckedItems, setEveningCheckedItems] = useState([]);
  const [openAnyTimeDialog, setOpenAnyTimeDialog] = useState(false);
  const [anyTimeCheckedItems, setAnyTimeCheckedItems] = useState([]);
  const currentDate = new Date();

  const [hover, setHover] = useState(false);
  const [hoverAfterNoon, setHoverAfterNoon] = useState(false);
  const [hoverEvening, setHoverEvening] = useState(false);
  const [hoverAnyTime, setHoverAnyTime] = useState(false);

  const images = [
    { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f305.png', alt: 'morning_emoji' },
    { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2600.png', alt: 'afternoon_emoji' },
    { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f307.png', alt: 'evening_emoji' },
    { src: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/23f0.png', alt: 'anyTime_emoji' },
  ]
  const partsOfDay = ["Morning", "Afternoon", "Evening", "Any Time"];
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleHoverEnter = () => {
    setHover(true);
  };
  const handleHoverLeave = () => {
    setHover(false);
  };
  const handleExpandIconClick = () => {
    setExpanded(!expanded);
  };
  // AFTERNOON
  const handleHoverAfterNoonEnter = () => {
    setHoverAfterNoon(true);
  };
  const handleHoverAfterNoonLeave = () => {
    setHoverAfterNoon(false);
  };
  const handleAfterNoonExClick = () => {
    setAfterNoonEx(!afterNoonEx);
  };
  // Evening
  const handleHoverEveningEnter = () => {
    setHoverEvening(true);
  };
  const handleHoverEveningLeave = () => {
    setHoverEvening(false);
  };
  const handleEveningExClick = () => {
    setEveningEx(!eveningEx);
  };
  // Any time
  const handleHoverAnyTimeEnter = () => {
    setHoverAnyTime(true);
  };
  const handleHoverAnyTimeLeave = () => {
    setHoverAnyTime(false);
  };
  const handleAnyTimeExClick = () => {
    setAnyTimeEx(!anyTimeEx);
  };
  const handlePreviousDayClick = () => {
    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    setDate(previousDay);
  };
  //Calendar
  const handleDateChange = (date) => {
    setDate(date);
    handleCalendarClose();
  };
  const handleDateElementClick = () => {
    setIsCalendarOpen(true);
  };
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };
  //
  const handleNextDayClick = () => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setDate(nextDay);
  };
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  };
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const isMobileResponsive = useMediaQuery("(max-width: 600px");
  const getCurrentWeekDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const weekDays = days
        .slice(currentDayIndex)
        .concat(days.slice(0, currentDayIndex)).map((day, index) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          return {
            day,
            dateKey: `${day}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
        };
        })
    return weekDays;
  };
  const weekDays = getCurrentWeekDays();
  // morning Dialog

  // checkbox Dialog
  const morningHabitRenderer = [
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f938.png', habit: 'Stretch' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2696.png', habit: 'Measure Weight' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f976.png', habit: 'Cold shower' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f95b.png', habit: 'Protein shake' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4aa.png', habit: 'Workout' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4d6.png', habit: 'Read 15 min'  },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/270d.png', habit: 'Morning journal' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4f5.png', habit: 'No social/news 1hr after waking up' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f9d8-200d-2642-fe0f.png', habit: 'Breathing exercise' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4a7.png', habit: 'Bottle of water in the morning' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2600.png', habit: 'Sunlight 10 min' },
  ];
  const afterNoonHabitRenderer = [
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f37d.png', habit: 'Fasting for 16 hrs' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f916.png', habit: '3+ hours of coding' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f49a.png', habit: 'Athletic Greens' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4aa.png', habit: 'Workout' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f4e7.png', habit: 'Inbox Zero'},
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4a7.png', habit: 'Bottle of water'},
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f9d8-200d-2642-fe0f.png', habit: 'Mindful' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2600.png', habit: 'Sunlight 10 min' },
  ];
  const eveningHabitRenderer = [
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/2705.png', habit: 'One personal task' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f436.png', habit: 'Quality time with pet' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f916.png', habit: '3+ hours of coding' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f9d8-200d-2642-fe0f.png', habit: 'Mindful meditation'},
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f4a7.png', habit: 'Bottle of Water' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f4aa.png', habit: 'Workout' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4d6.png', habit: 'Reading 15 min'},
  ];
  const anyTimeHabitRenderer = [
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f938.png', habit: 'Stretch' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2696.png', habit: 'Measure Weight' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f976.png', habit: 'Cold shower' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f95b.png', habit: 'Protein shake' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4aa.png', habit: 'Workout' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4d6.png', habit: 'Read 15 min'  },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/270d.png', habit: 'Morning journal' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f4f5.png', habit: 'No social/news 1hr after waking up' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f9d8-200d-2642-fe0f.png', habit: 'Breathing exercise' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2600.png', habit: 'Sunlight 10 min' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/2705.png', habit: 'One personal task' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f436.png', habit: 'Quality time with pet' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f916.png', habit: '3+ hours of coding' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f9d8-200d-2642-fe0f.png', habit: 'Mindful meditation'},
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f4a7.png', habit: 'Bottle of Water' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f4aa.png', habit: 'Workout' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f37d.png', habit: 'Fasting for 16 hrs' },
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f49a.png', habit: 'Athletic Greens' },
    { img: 'https://twemoji.maxcdn.com/v/14.0.1/72x72/1f4e7.png', habit: 'Inbox Zero'},
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/2615.png', habit: 'Coffee'},
    { img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@v14.0.1/assets/72x72/1f957.png', habit: 'Log meals for day'}
  ];
  const [checkedHabits, setCheckedHabits] = useState(() => {
    const storedMorningCheckedItems = localStorage.getItem("morningCheckedItems");
    return storedMorningCheckedItems ? JSON.parse(storedMorningCheckedItems) : {};
  });
  const [afterNoonHabits, setAfterNoonHabits] = useState(() => {
    const storedAfterNoonCheckedItems = localStorage.getItem("afterNoonCheckedItems");
    return storedAfterNoonCheckedItems ? JSON.parse(storedAfterNoonCheckedItems) : {};
  });
  const [eveningHabits, setEveningHabits] = useState(() => {
    const storedEveningCheckedItems = localStorage.getItem("eveningCheckedItems");
    return storedEveningCheckedItems ? JSON.parse(storedEveningCheckedItems) : {};
  });
  const [anyTimeHabits, setAnyTimeHabits] = useState(() => {
    const storedAnyTimeCheckedItems = localStorage.getItem("anyTimeCheckedItems");
    return storedAnyTimeCheckedItems ? JSON.parse(storedAnyTimeCheckedItems) : {};
  })
  const dateKey = `${dayOfWeek}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
  const handleCheckboxClick = (index) => {
    const selectedHabit = morningHabitRenderer[index];
    setCheckedHabits((prevCheckedHabits) => {
      const updatedCheckedHabits = { ...prevCheckedHabits };
      const habitsForDay = updatedCheckedHabits[dateKey] || [];

      if(habitsForDay.includes(selectedHabit.habit)) {
        updatedCheckedHabits[dateKey] = habitsForDay.filter(
            (habit) => habit !== selectedHabit.habit
        );
      } else {
        for (let day in updatedCheckedHabits) {
          if (day !== dateKey) {
            updatedCheckedHabits[day] = updatedCheckedHabits[day].filter(
                (habit) => habit !== selectedHabit.habit
            );
          }
        }
        updatedCheckedHabits[dateKey] = [...habitsForDay, selectedHabit.habit];
      }
      localStorage.setItem("morningCheckedItems", JSON.stringify(updatedCheckedHabits));
      return updatedCheckedHabits;
    })
  }
  const handleAfterNoonCheckboxClick = (index) => {
    const selectedHabit = afterNoonHabitRenderer[index]

    setAfterNoonHabits((prevCheckedHabits) => {
      const updatedCheckedHabits = { ...prevCheckedHabits };
      const habitsForDay = updatedCheckedHabits[dateKey] || [];

      if(habitsForDay.includes(selectedHabit.habit)) {
        updatedCheckedHabits[dateKey] = habitsForDay.filter(
            (habit) => habit !== selectedHabit.habit
        );
      } else {
        for (let day in updatedCheckedHabits) {
          if (day !== dayOfMonth) {
            updatedCheckedHabits[day] = updatedCheckedHabits[day].filter(
                (habit) => habit !== selectedHabit.habit
            )
          }
        }
        updatedCheckedHabits[dateKey] = [...habitsForDay, selectedHabit.habit];
      }
      localStorage.setItem("afterNoonCheckedItems", JSON.stringify(updatedCheckedHabits));
      return updatedCheckedHabits;
    })
  }
  const handleEveningCheckboxClick = (index) => {
    const selectedHabit = eveningHabitRenderer[index];

    setEveningHabits((prevCheckedHabits) => {
      const updatedCheckedHabits = { ...prevCheckedHabits };
      const habitsForDay = updatedCheckedHabits[dateKey] || [];

      if(habitsForDay.includes(selectedHabit.habit)) {
        updatedCheckedHabits[dateKey] = habitsForDay.filter(
            (habit) => habit !== selectedHabit.habit
        )
      } else {
        for (let day in updatedCheckedHabits) {
          if (day !== dayOfMonth) {
            updatedCheckedHabits[day] = updatedCheckedHabits[day].filter(
                (habit) => habit !== selectedHabit.habit
            )
          }
        }
        updatedCheckedHabits[dateKey] = [...habitsForDay, selectedHabit.habit];
      }
      localStorage.setItem("eveningCheckedItems", JSON.stringify(updatedCheckedHabits));
      return updatedCheckedHabits;
    })
  }
  const handleAnyTimeCheckboxClick = (index) => {
    const selectedHabit = anyTimeHabitRenderer[index];

    setAnyTimeHabits((prevCheckedHabits) => {
      const updatedCheckedHabits = { ...prevCheckedHabits };
      const habitsForDay = updatedCheckedHabits[dateKey] || [];

      if(habitsForDay.includes(selectedHabit.habit)) {
        updatedCheckedHabits[dateKey] = habitsForDay.filter(
            (habit) => habit !== selectedHabit.habit
        )
      } else {
        for(let day in updatedCheckedHabits) {
          if(day !== dayOfMonth) {
            updatedCheckedHabits[day] = updatedCheckedHabits[day].filter(
                (habit) => habit !== selectedHabit.habit
            )
          }
        }
        updatedCheckedHabits[dateKey] = [...habitsForDay, selectedHabit.habit];
      }
      localStorage.setItem("anyTimeCheckedItems", JSON.stringify(updatedCheckedHabits));
      return updatedCheckedHabits;
    })
  }
  useEffect(() => {
    const storedMorningCheckedItems = localStorage.getItem("morningCheckedItems");
    if (storedMorningCheckedItems) {
      setMorningCheckedItems(JSON.parse(storedMorningCheckedItems));
    }
  }, [checkedHabits]);
  useEffect(() => {
    const storedAfterNoonCheckedItems = localStorage.getItem("afterNoonCheckedItems");
    if(storedAfterNoonCheckedItems) {
      setAfterNoonCheckedItems(JSON.parse(storedAfterNoonCheckedItems));
    }
  }, [afterNoonHabits])
  useEffect(() => {
    const storedEveningCheckedItems = localStorage.getItem("eveningCheckedItems");
    if(storedEveningCheckedItems) {
      setEveningCheckedItems(JSON.parse(storedEveningCheckedItems));
    }
  }, [eveningHabits])
  useEffect(() => {
    const storedAnyTimeCheckedItems = localStorage.getItem("anyTimeCheckedItems");
    if(storedAnyTimeCheckedItems) {
      setAnyTimeCheckedItems(JSON.parse(storedAnyTimeCheckedItems));
    }
  }, [anyTimeHabits]);
  // morning Dialog
  const handleOpenMorningDialog = (event) => {
    setOpenMorningDialog(true);
  }
  const handleCloseMorningDialog = () => {
    setCheckedHabits([]);
    setClickedHabitIndex([]);
    setOpenMorningDialog(false);
    localStorage.removeItem("morningCheckedItems");
    localStorage.removeItem("clickedHabitIndex");
  }
  const handleSubmitMorningDialog = () => {
    setOpenMorningDialog(false);
  }
  //
  // afterNoon
  const handleOpenAfterNoonDialog = () => {
    setOpenAfterNoonDialog(true);
  }
  const handleCloseAfterNoonDialog = () => {
    setAfterNoonHabits([]);
    setClickedAfterNoonHabitIndex([]);
    setOpenAfterNoonDialog(false);
    localStorage.removeItem("afterNoonCheckedItems");
    localStorage.removeItem("clickedAfterNoonHabitIndex");
  }
  const handleSubmitAfterNoonDialog = () => {
    setOpenAfterNoonDialog(false);
  }
  // Evening
  const handleOpenEveningDialog = () => {
    setOpenEveningDialog(true);
  }
  const handleCloseEveningDialog = () => {
    setEveningHabits([]);
    setClickedEveningHabitIndex([]);
    setOpenEveningDialog(false);
    localStorage.removeItem("eveningCheckedItems");
    localStorage.removeItem("clickedEveningHabitIndex");
  }
  const handleSubmitEveningDialog = () => {
    setOpenEveningDialog(false);
  }
  // Any Time Habits dialog
  const handleOpenAnyTimeDialog = () => {
    setOpenAnyTimeDialog(true);
  }
  const handleCloseAnyTimeDialog = () => {
    setAnyTimeHabits([]);
    setClickedAnyTimeHabitIndex([]);
    setOpenAnyTimeDialog(false);
    localStorage.removeItem("anyTimeCheckedItems");
    localStorage.removeItem("clickedAnyTimeHabitIndex");
  }
  const handleSubmitAnyTimeDialog = () => {
    setOpenAnyTimeDialog(false);
  }
  const localStorageClear = () => {
    localStorage.clear();
  }
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
  const handleCardClick = (dayOfWeek, index) => {
    setClickedHabitIndex((prevClickedHabits) => {
      if (prevClickedHabits[dayOfWeek]?.includes(index)) {
        return {
          ...prevClickedHabits,
          [dayOfWeek]: prevClickedHabits[dayOfWeek].filter((i) => i !== index),
        };
      } else {
        return {
          ...prevClickedHabits,
          [dayOfWeek]: [...(prevClickedHabits[dayOfWeek] || []), index],
        };
      }
    });
  }
  const handleAfterNoonCardClick = (dayOfWeek, index) => {
    setClickedAfterNoonHabitIndex((prevClickedAfterNoonHabits) => {
      if(prevClickedAfterNoonHabits[dayOfWeek]?.includes(index)) {
        return {
          ...prevClickedAfterNoonHabits,
          [dayOfWeek]: prevClickedAfterNoonHabits[dayOfWeek].filter((i) => i !== index),
        }
      } else {
        return {
          ...prevClickedAfterNoonHabits,
          [dayOfWeek]: [...(prevClickedAfterNoonHabits[dayOfWeek] || []), index],
        }
      }
    })
  }
  const handleEveningCardClick = (dayOfWeek, index) => {
    setClickedEveningHabitIndex((prevClickedEveningHabits) => {
      if (prevClickedEveningHabits[dayOfWeek]?.includes(index)) {
        return {
          ...prevClickedEveningHabits,
          [dayOfWeek]: prevClickedEveningHabits[dayOfWeek].filter((i) => i !== index),
        }
      } else {
        return {
          ...prevClickedEveningHabits,
          [dayOfWeek]: [...(prevClickedEveningHabits[dayOfWeek] || []), index],
        }
      }
    })
  }
  const handleAnyTimeCardClick = (dayOfWeek, index) => {
    setClickedAnyTimeHabitIndex((prevClickedAnyTimeHabits) => {
      if(prevClickedAnyTimeHabits[dayOfWeek]?.includes(index)) {
        return {
          ...prevClickedAnyTimeHabits,
          [dayOfWeek]: prevClickedAnyTimeHabits[dayOfWeek].filter((i) => i !== index),
        }
      } else {
        return {
          ...prevClickedAnyTimeHabits,
          [dayOfWeek]: [...(prevClickedAnyTimeHabits[dayOfWeek] || []), index],
        }
      }
    })
  }
  useEffect(() => {
    localStorage.setItem("clickedHabitIndex", JSON.stringify(clickedHabitIndex));
    localStorage.setItem("clickedAfterNoonHabitIndex", JSON.stringify(clickedAfterNoonHabitIndex));
    localStorage.setItem("clickedEveningHabitIndex", JSON.stringify(clickedEveningHabitIndex));
    localStorage.setItem("clickedAnyTimeHabitIndex", JSON.stringify(clickedAnyTimeHabitIndex));
  }, [clickedHabitIndex, clickedAfterNoonHabitIndex, clickedEveningHabitIndex, clickedAnyTimeHabitIndex]);
  function getMonth(date) {
    const options = { month: 'short'};
    return date.toLocaleString('en-US', options);
  }
  function getNextMonthDate(date, index) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + index);

    const dayOfMonth = currentDate.getDate();

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate());
    const nextDayOfMonth = nextDate.getDate();

    let nextMonth = getMonth(nextDate);

    if(nextDayOfMonth === 1) {
      nextMonth = getMonth(nextDate);
    }
    return { dayOfMonth, nextMonth };
  }
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div
            style={{
              background: "#5E5E60",
              marginTop: "30px",
              paddingLeft: "30px",
            }}
        >
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab
                label="Day"
                style={{ color: selectedTab === 0 ? "rgb(193, 194, 197)" : "" }}
            />
            <Tab
                label="Week"
                style={{ color: selectedTab === 1 ? "rgb(193, 194, 197)" : "" }}
            />
          </Tabs>
          {selectedTab === 0 && (
              <div style={{ position: "relative", marginTop: "20px" }}>
                <div
                    style={{
                      color: "#C1C2C5",
                      alignItems: "center",
                      display: "flex",
                      width: isMobileResponsive ? "90vw" : "15vw",
                      justifyContent: "space-between",
                    }}
                >
                  <ArrowBackIcon onClick={handlePreviousDayClick} />
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
                      <Calendar value={date} onChange={handleDateChange} />
                    </Popover>
                  </div>
                  <ArrowForwardIcon onClick={handleNextDayClick} />
                </div>
                <AddHabit checkedHabits={checkedHabits}
                          hover={hover}
                          expanded={expanded}
                          handleExpandIconClick={handleExpandIconClick}
                          handleHoverEnter={handleHoverEnter}
                          handleHoverLeave={handleHoverLeave}
                          handleOpenDialog={handleOpenMorningDialog}
                          handleCardClick={handleCardClick}
                          open={openMorningDialog}
                          handleClose={handleCloseMorningDialog}
                          handleSubmit={handleSubmitMorningDialog}
                          habitRenderer={morningHabitRenderer}
                          handleCheckboxClick={handleCheckboxClick}
                          clickedIndex={clickedHabitIndex}
                          handlePopoverOpen={handlePopoverOpen}
                          handlePopoverClose={handlePopoverClose}
                          anchorEl={anchorEl}
                          isMobileResponsive={isMobileResponsive}
                          img={images[0].src}
                          alt={images[0].alt}
                          partOfDay={partsOfDay[0]}
                          dateKey={dateKey}
                />
                <AddHabit
                    checkedHabits={afterNoonHabits}
                    hover={hoverAfterNoon}
                    expanded={afterNoonEx}
                    handleExpandIconClick={handleAfterNoonExClick}
                    handleHoverEnter={handleHoverAfterNoonEnter}
                    handleHoverLeave={handleHoverAfterNoonLeave}
                    handleOpenDialog={handleOpenAfterNoonDialog}
                    handleCardClick={handleAfterNoonCardClick}
                    open={openAfterNoonDialog}
                    handleClose={handleCloseAfterNoonDialog}
                    handleSubmit={handleSubmitAfterNoonDialog}
                    habitRenderer={afterNoonHabitRenderer}
                    handleCheckboxClick={handleAfterNoonCheckboxClick}
                    clickedIndex={clickedAfterNoonHabitIndex}
                    handlePopoverOpen={handlePopoverOpen}
                    handlePopoverClose={handlePopoverClose}
                    anchorEl={anchorEl}
                    isMobileResponsive={isMobileResponsive}
                    img={images[1].src}
                    alt={images[1].alt}
                    partOfDay={partsOfDay[1]}
                    dateKey={dateKey}
                />
                <AddHabit
                   checkedHabits={eveningHabits}
                   hover={hoverEvening}
                   expanded={eveningEx}
                   handleExpandIconClick={handleEveningExClick}
                   handleHoverEnter={handleHoverEveningEnter}
                   handleHoverLeave={handleHoverEveningLeave}
                   handleOpenDialog={handleOpenEveningDialog}
                   handleCardClick={handleEveningCardClick}
                   open={openEveningDialog}
                   handleClose={handleCloseEveningDialog}
                   handleSubmit={handleSubmitEveningDialog}
                   habitRenderer={eveningHabitRenderer}
                   handleCheckboxClick={handleEveningCheckboxClick}
                   clickedIndex={clickedEveningHabitIndex}
                   handlePopoverOpen={handlePopoverOpen}
                   handlePopoverClose={handlePopoverClose}
                   anchorEl={anchorEl}
                   isMobileResponsive={isMobileResponsive}
                   img={images[2].src}
                   alt={images[2].alt}
                   partOfDay={partsOfDay[2]}
                   dateKey={dateKey}

                />
                <AddHabit
                    checkedHabits={anyTimeHabits}
                    hover={hoverAnyTime}
                    expanded={anyTimeEx}
                    handleExpandIconClick={handleAnyTimeExClick}
                    handleHoverEnter={handleHoverAnyTimeEnter}
                    handleHoverLeave={handleHoverAnyTimeLeave}
                    handleOpenDialog={handleOpenAnyTimeDialog}
                    handleCardClick={handleAnyTimeCardClick}
                    open={openAnyTimeDialog}
                    handleClose={handleCloseAnyTimeDialog}
                    handleSubmit={handleSubmitAnyTimeDialog}
                    habitRenderer={anyTimeHabitRenderer}
                    handleCheckboxClick={handleAnyTimeCheckboxClick}
                    clickedIndex={clickedAnyTimeHabitIndex}
                    handlePopoverOpen={handlePopoverOpen}
                    handlePopoverClose={handlePopoverClose}
                    anchorEl={anchorEl}
                    isMobileResponsive={isMobileResponsive}
                    img={images[3].src}
                    alt={images[3].alt}
                    partOfDay={partsOfDay[3]}
                    dateKey={dateKey}
                />
              </div>
          )}
          {selectedTab === 1 && (
              <div style={{ position: "relative" }}>
                <table style={{ borderCollapse: "collapse", width: "99%" }}>
                  <thead>
                  <tr
                      style={{
                        width: "100%",
                        borderBottom: "0.0625rem solid #c1c2c5",
                      }}
                  >
                    <th style={{ width: "40%", padding: "7px 0" }}></th>
                    {weekDays.map((day, index) => {
                      const { dayOfMonth, nextMonth } = getNextMonthDate(currentDate, index);
                      return (
                          <th
                              key={index}
                              style={{
                                padding: isMobileResponsive ? "5px 0" : "7px 0",
                                borderBottom: "0.0625rem solid #c1c2c5",
                                textAlign: "left",
                                fontSize: isMobileResponsive ? '12px' : '14px',
                              }}
                          >
                            <div
                                style={{
                                  color: "#c1c2c5",
                                  fontWeight: "bold",
                                }}
                            >
                              {day.day}
                            </div>
                            <div
                                style={{
                                  color: "#c1c2c5",
                                  fontWeight: 500,
                                  fontSize: isMobileResponsive ? "10px" : "12px",
                                }}
                            >
                              {!isMobileResponsive ? (
                                  `${dayOfMonth} ${nextMonth}`
                              ) : (
                                  dayOfMonth
                              )}
                              <div style={{color: '#c1c2c5', fontWeight: 500, fontSize: isMobileResponsive ? '10px' : '12px'}}>
                                {isMobileResponsive && nextMonth}
                              </div>
                            </div>
                          </th>
                      )
                    })}
                  </tr>
                  </thead>
                  <tbody>
                  {anyTimeHabitRenderer.map((item, index) => {
                    return (
                        <tr key={index} style={{ height: isMobileResponsive ? '38px' : "45px", display: "table-row", borderBottom: "0.0625rem solid #c1c2c5" }}>
                          <td style={{ padding: "6px 0" }}>
                            <div
                                style={{
                                  display: "flex",
                                  color: "#c1c2c5",
                                  fontWeight: 400,
                                  fontSize: isMobileResponsive ? "14px" : "15px",
                                  gap: "0.3125rem",
                                }}
                            >
                              <img
                                  style={{ width: isMobileResponsive ? "14px" : "18px", height: isMobileResponsive ? "14px" : "18px" }}
                                  alt="rainbow"
                                  src={item.img}
                              />
                              <div>{item.habit}</div>
                            </div>
                          </td>
                          {weekDays.map((day, dayIndex) => {
                            const habitsForDay = checkedHabits[day.dateKey] || [];
                            const habitsAfterNoon = afterNoonHabits[day.dateKey] || [];
                            const habitsEvening = eveningHabits[day.dateKey] || [];
                            const habitsAnyTime = anyTimeHabits[day.dateKey] || [];
                            const isHabitPresentForDay = habitsForDay.includes(item.habit);
                            const isAfterNoonForDay = habitsAfterNoon.includes(item.habit);
                            const isEveningForDay = habitsEvening.includes(item.habit);
                            const isAnyTimeForDay = habitsAnyTime.includes(item.habit);
                            return (
                                <td key={dayIndex} style={{ padding: isMobileResponsive ? "6px 0" : "7px 0" }}>
                                  <div
                                      style={{
                                        boxSizing: "border-box",
                                        display: "flex",
                                        flexFlow: "row wrap",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "1rem",
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "7px",
                                        backgroundImage: isHabitPresentForDay || isAfterNoonForDay || isEveningForDay || isAnyTimeForDay ? "linear-gradient(45deg, rgb(103, 63, 217) 0%, rgb(194, 37, 92) 100%)" : "none",
                                        backgroundColor: isHabitPresentForDay || isAfterNoonForDay || isEveningForDay || isAnyTimeForDay ? "none" : "rgba(61, 61, 61, 0.5)",
                                      }}
                                  >
                                  </div>
                                </td>
                            );
                          })}
                        </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
          )}
        </div>
      </LocalizationProvider>
  );
};

export default HabitTracker;