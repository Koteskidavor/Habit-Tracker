import React from "react";
import "./Table.css";

const Table = ({ getNextMonthDate, weekDays, isMobileResponsive }) => {
  return (
    <table className="table-container">
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
                    ? "table-headerDays table-header"
                    : "table-header"
                }
              ></th>
            );
          })}
        </tr>
      </thead>
    </table>
  );
};

export default Table;
