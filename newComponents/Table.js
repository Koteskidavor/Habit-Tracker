import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.css";

const Table = ({ getNextMonthDate, weekDays, isMobileResponsive }) => {
  return (
    <table className="table-container">
      <TableHeader
        getNextMonthDate={getNextMonthDate}
        weekDays={weekDays}
        isMobileResponsive={isMobileResponsive}
      />
      <TableBody />
    </table>
  );
};

export default Table;
