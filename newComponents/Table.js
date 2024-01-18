import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.css";

const Table = ({ getNextMonthDate, currentDate, weekDays, isMobileResponsive, combinedRenderer, clickedHabitIndex }) => {
  return (
    <table className="table-container">
      <TableHeader
        currentDate={currentDate}
        getNextMonthDate={getNextMonthDate}
        weekDays={weekDays}
        isMobileResponsive={isMobileResponsive}
      />
       <TableBody combinedRenderer={combinedRenderer} isMobileResponsive={isMobileResponsive} weekDays={weekDays} clickedHabitIndex={clickedHabitIndex} />
    </table>
  );
};

export default Table;
