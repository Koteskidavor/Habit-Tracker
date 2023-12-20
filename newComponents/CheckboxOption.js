import React from 'react';

const CheckboxOption = ({ label, value, checked, onChange }) => {
    return (
        <label>
            {label}
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
        </label>
    )
}

export default CheckboxOption;