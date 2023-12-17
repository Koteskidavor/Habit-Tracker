import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import './Popup.css';
const Popup = ({ close, habitRenderer, open, handleSubmit, handleCheckboxClick, checkedHabits, dateKey, dayKey }) => {
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
                        {/* inside if else statement*/}
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
                            <Button className="add-icon">
                                <AddIcon />
                            </Button>
                        </div>
                    </div>
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