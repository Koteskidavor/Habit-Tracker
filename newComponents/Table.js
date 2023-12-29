import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.css";

const Table = ({
  getNextMonthDate,
  weekDays,
  isMobileResponsive,
  combinedRenderer,
}) => {
  return (
    <table className="table-container">
      <TableHeader
        getNextMonthDate={getNextMonthDate}
        weekDays={weekDays}
        isMobileResponsive={isMobileResponsive}
      />
      {/* <TableBody combinedRenderer={combinedRenderer} /> */}
    </table>
  );
};

export default Table;
