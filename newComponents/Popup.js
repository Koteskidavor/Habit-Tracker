import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import './Popup.css';
const Popup = ({ close, handleAddNewHabitOpen, habitRenderer, handleCancelClick, handleAddNewHabitClick, open, handleSubmit, handleCheckboxClick, checkedHabits, dateKey, dayKey, isAddingHabit, newImg, setNewImg, newHabit, setNewHabit, habitOption, handleOptionChange }) => {
    return (
        <Dialog
            open={open}
            onClose={handleSubmit}
        >
            <DialogTitle className="dialog-title">
                Organize your Day
            </DialogTitle>
            <DialogContent className="content">
                <div className="main-content" >
                    <div className="main-content" >
                        {isAddingHabit ? (
                            <div className="newHabit-container">
                                <div className="input-container">
                                    <input
                                        type="text"
                                        placeholder="Add Image"
                                        value={newImg}
                                        onChange={(e) => setNewImg(e.target.value)}
                                        className="main-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Add Habit"
                                        value={newHabit}
                                        onChange={(e) => setNewHabit(e.target.value)}
                                        className="main-input"
                                    />
                                </div>
                                <div className="button-container" onClick={handleCancelClick}>
                                    Cancel
                                </div>
                                <div className="button-container" onClick={handleAddNewHabitClick}>
                                    Submit
                                </div>
                            </div>
                        ): (
                            <div className="habit-wrapper">
                                {habitRenderer.map((habit, index) => {
                                    const isSelected = (checkedHabits[dateKey] && checkedHabits[dateKey].includes(habit.habit)) || (checkedHabits[dayKey] && checkedHabits[dayKey].includes(habit.habit));
                                    return (
                                        <div key={index} className="popup-habits">
                                            <div onClick={() => handleCheckboxClick(index)} className="checked-box">
                                                {isSelected && <CheckCircleIcon/>}
                                            </div>
                                            <div className="image-container">
                                                <img
                                                    className="img"
                                                    draggable="false"
                                                    src={habit.img}
                                                />
                                            </div>
                                            <div className="habit-title">
                                                {habit.habit}
                                            </div>
                                        </div>
                                    )
                                })}
                                <Button className="add-icon" onClick={handleAddNewHabitOpen}>
                                    <AddIcon />
                                </Button>
                            </div>
                        )}
                    </div>
                    {isAddingHabit ? null : (
                        <div className="weekdays">
                            <label>
                                Monday
                                <input
                                    type="checkbox"
                                    value="Monday"
                                    checked={habitOption === "Monday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                            <label>
                                Tuesday
                                <input
                                    type="checkbox"
                                    value="Tuesday"
                                    checked={habitOption === "Tuesday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                            <label>
                                Wednesday
                                <input
                                    type="checkbox"
                                    value="Wednesday"
                                    checked={habitOption === "Wednesday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                            <label>
                                Thursday
                                <input
                                    type="checkbox"
                                    value="Thursday"
                                    checked={habitOption === "Thursday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                            <label>
                                Friday
                                <input
                                    type="checkbox"
                                    value="Friday"
                                    checked={habitOption === "Friday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                            <label>
                                Saturday
                                <input
                                    type="checkbox"
                                    value="Saturday"
                                    checked={habitOption === "Saturday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                            <label>
                                Sunday
                                <input
                                    type="checkbox"
                                    value="Sunday"
                                    checked={habitOption === "Sunday"}
                                    onChange={handleOptionChange}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions className="dialog-actions">
                <Button onClick={close} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Popup;