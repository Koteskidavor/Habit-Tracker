import React from "react";
import "./TableBody.css";

const TableBody = ({ combinedRenderer, isMobileResponsive, weekDays, clickedHabitIndex }) => {
  return (
    <tbody>
      {combinedRenderer.map((item, index) => {
        return (
          <tr key={index} className="table-bodyRow">
            <td className="table-tdBody">
              <div className={isMobileResponsive ? "habit-containerRes habit-container" : "habit-container"}>
                <img className={isMobileResponsive ? "img-stylingRes img-styling" : "img-styling"} alt="rainbow" src={item.img} />
                <div>{item.habit}</div>
              </div>
            </td>
            {weekDays.map((day, dayIndex) => {
              const habitsForDay = clickedHabitIndex[day.dateKey] || [];
              const isHabitPresentForDay = habitsForDay.includes(
                  item.habit
              );
              return (
                  <td key={dayIndex} className={isMobileResponsive ? "box-containerRes box-container" : "box-container"}>
                    <div className={isHabitPresentForDay ? "box-main" : "box-mainRes"}>
                    </div>
                  </td>
              )
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
