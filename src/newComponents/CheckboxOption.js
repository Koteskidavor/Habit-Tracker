import React from "react";
import "./CheckboxOption.css";

const CheckboxOption = ({ label, value, checked, onChange }) => {
  return (
    <label className="label-styling">
      {label}
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

export default CheckboxOption;
