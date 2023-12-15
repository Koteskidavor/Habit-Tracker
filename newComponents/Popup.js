import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import './Popup.css';
const Popup = ({ habitRenderer, open, handleSubmit }) => {
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
                                return (
                                    <div key={index} className="popup-habits">
                                        <div className="checked-box">
                                            <CheckCircleIcon />
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
        </Dialog>
    )
}

export default Popup;