import React from "react";
import "./TableBody.css";

const TableBody = ({ combinedRenderer }) => {
  return (
    <tbody>
      {combinedRenderer.map((item, index) => {
        return (
          <tr key={index} className="table-bodyRow">
            <td className="table-tdBody"></td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
