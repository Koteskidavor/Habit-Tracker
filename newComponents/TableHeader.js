import React from "react";
import "./TableHeader.css";

const TableHeader = ({
  weekDays,
  getNextMonthDate,
  isMobileResponsive,
  currentDate,
}) => {
  return (
    <thead>
      <tr className="table-row">
        <th className="table-header"></th>
        {weekDays.map((day, index) => {
          const { dayOfMonth, nextMonth } = getNextMonthDate(
            currentDate,
            index
          );
          return (
            <th
              key={index}
              className={
                isMobileResponsive
                  ? "table-headerDaysRes table-headerDays"
                  : "table-headerDays"
              }
            >
              <div key={index} className="table-day">
                {day.day}
              </div>
              <div
                className={
                  isMobileResponsive
                    ? "date-containerResponsive date-container"
                    : "date-container"
                }
              >
                {!isMobileResponsive
                  ? `${dayOfMonth} ${nextMonth}`
                  : dayOfMonth}
                <div
                  className={
                    isMobileResponsive
                      ? "next-monthResponsive next-month"
                      : "next-month"
                  }
                >
                  {isMobileResponsive && nextMonth}
                </div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
