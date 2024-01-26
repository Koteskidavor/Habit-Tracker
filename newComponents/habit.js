import React from "react";
import "./habit.css";
const Habit = ({
    checkedHabits,
    dateKey,
    dayKey,
    habitRenderer,
    clickedIndex,
    handleCardClick,
    isMobileResponsive,
}) => {
  return (
    <div className={isMobileResponsive ? "habit-containerRes habit-container" : "habit-container"}>
      {(checkedHabits[dateKey] || checkedHabits[dayKey])?.map(
        (habit, index) => {
          const habitDetails = habitRenderer.find(
            (item) => item.habit === habit
          );
          if (!habitDetails) {
            return null;
          }
          const { img, habit: habitName } = habitDetails;
          const isHabitClicked = clickedIndex[dateKey] && clickedIndex[dateKey].includes(habitName);
          return (
            <div
              key={index}
              className={isHabitClicked ? "card-style clicked" : "card-style"}
              onClick={() => handleCardClick(dateKey, index)}
            >
              <div className="habit-img">
                <img className="card-img" src={img} alt={habitName} />
              </div>
              <div className="habit-title">{habitName}</div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Habit;
