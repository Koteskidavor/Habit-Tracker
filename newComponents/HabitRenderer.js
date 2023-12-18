import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import Popup from './Popup';
import Habit from './habit';
import './HabitRenderer.css';
const HabitRenderer = ({ habitOption, handleOptionChange, handleAddNewHabitClick, handleCancelClick, newHabit, newImg, open, handleOpenDialog, close, handleSubmit, hover, expanded, handleExpandIconClick, img, alt, type, habitRenderer, handleCheckboxClick, dateKey, dayKey, checkedHabits, isAddingHabit, setNewImg }) => {
    return (
        <div className="main">
            <ExpandLessIcon className={`icon-container ${hover ? 'hover' : ''} ${expanded ? 'rotate-up' : 'rotate-down'}`} onClick={handleExpandIconClick} />
            <img
                className="img-renderer"
                draggable="false"
                alt={alt}
                src={img}
            />
            <span className="timeOfDay">{type}</span>
            <IconButton onClick={handleOpenDialog} className="habit-icon">
                <AddIcon />
            </IconButton>
            <Popup handleOptionChange={handleOptionChange} habitOption={habitOption} open={open} close={close} isAddingHabit={isAddingHabit} handleSubmit={handleSubmit} habitRenderer={habitRenderer} handleCheckboxClick={handleCheckboxClick} handleCancelClick={handleCancelClick} handleAddNewHabitClick={handleAddNewHabitClick} dateKey={dateKey} dayKey={dayKey} checkedHabits={checkedHabits} newImg={newImg} newHabit={newHabit} setNewImg={setNewImg} />
            {!expanded && (
                <Habit checkedHabits={checkedHabits} dateKey={dateKey} dayKey={dayKey} habitRenderer={habitRenderer} />
                // <div>
                //     {(checkedHabits[dateKey] || checkedHabits[dayKey])?.map((habit, index) => {
                //         const habitDetails = habitRenderer.find(
                //             (item) => item.habit === habit
                //         );
                //         if(!habitDetails) {
                //             return null;
                //         }
                //         const { img, habit: habitName } = habitDetails;
                //         return (
                //             <div key={index} className="card-style">
                //                 <div className="habit-img">
                //                     <img className="card-img" src={img} alt={habitName}/>
                //                 </div>
                //                 <div className="habit-title">
                //                     {habitName}
                //                 </div>
                //             </div>
                //         )
                //     })}
                // </div>
            )}
        </div>
    )
}

export default HabitRenderer;