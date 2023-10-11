import React, { useEffect, useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Popover} from '@mui/material'
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from "@mui/icons-material/MoreVert";
const AddHabit = ({ dateKey, partOfDay, hover, open, handleClose, handleSubmit, habitRenderer, handleCheckboxClick, checkedHabits, isMobileResponsive, expanded, handleExpandIconClick, handleHoverEnter, handleHoverLeave, handleOpenDialog, clickedIndex, handleCardClick, handlePopoverOpen, handlePopoverClose, anchorEl, img, alt }) => {

    return (
        <div style={{ marginTop: "20px" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#C1C2C5",
                    justifyContent: "flex-start",
                    marginLeft: "30px",
                }}
            >
                <ExpandLessIcon
                    style={{
                        fontSize: "15px",
                        marginRight: "15px",
                        borderRadius: hover ? "0" : "50%",
                        transition: "transform 0.5s",
                        transform: expanded ? "rotate(-180deg)" : "rotate(0deg)",
                        background: hover ? "rgba(52, 58, 64, 0.2)" : "transparent",
                    }}
                    onClick={handleExpandIconClick}
                    onMouseEnter={handleHoverEnter}
                    onMouseLeave={handleHoverLeave}
                />
                <img
                    style={{ height: "20px", width: "20px", marginRight: "10px" }}
                    draggable="false"
                    alt={alt}
                    src={img}
                />
                <span style={{ fontSize: "25px" }}>{partOfDay}</span>
                <IconButton style={{ color: '#C1C2C5',}} onClick={handleOpenDialog}>
                    <AddIcon />
                </IconButton>
                <Dialog open={open} onClose={handleSubmit} >
                    <DialogTitle style={{ background: '#c1c2c5', textAlign: 'center', }}>Organize your Day</DialogTitle>
                    <DialogContent style={{ background: '#c1c2c5', height: '40vh', overflowY: 'auto', }}>
                        <div style={{ display: 'flex', marginTop: '15px', height: '40vh', flexWrap: 'wrap'}}>
                            {habitRenderer.map((habit, index) => {
                                const isSelected = checkedHabits[dateKey] && checkedHabits[dateKey].includes(habit.habit);
                                return (
                                    <div key={index} style={{
                                        background: '#212529',
                                        color: 'white',
                                        width: isMobileResponsive ? '100%' : '8vw',
                                        padding: '15px',
                                        borderRadius: '5px',
                                        position: 'relative',
                                        margin: '5px',
                                    }}>
                                        <div onClick={() => handleCheckboxClick(index)} style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            background: '#C1C2C5',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}>
                                            {isSelected && <CheckCircleIcon />}
                                        </div>
                                        <div style={{
                                            fontSize: '48px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <img style={{ height: '20px', width: '20px', marginRight: '10px', textAlign: 'center', }}
                                                 draggable="false" alt="morning_emoji" src={habit.img}/>
                                        </div>
                                        <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center' }}>{habit.habit}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <style>
                            {`
                    ::-webkit-scrollbar {
                        width: 8px;
                        background: #c1c2c5;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #6c757d;
                        border-radius: 4px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background-color: #495057;
                    }
              `}
                        </style>
                    </DialogContent>
                    <DialogActions style={{ background: '#c1c2c5', }}>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {!expanded && (
                <div
                    style={{
                        display: "flex",
                        marginLeft: "30px",
                        opacity: expanded ? 0 : 1,
                        flexWrap: "wrap",
                    }}
                >
                    {checkedHabits[dateKey]?.map((habit, index) => {
                        const habitDetails = habitRenderer.find((item) => item.habit === habit);
                        if(!habitDetails) {
                            return null;
                        }
                        const { img, habit: habitName } = habitDetails;
                        const isHabitClicked = clickedIndex[dateKey]?.includes(index);
                        const cardStyle = {
                            background: isHabitClicked
                                ? "linear-gradient(rgb(52, 58, 64), rgb(52, 58, 64)) padding-box padding-box, linear-gradient(45deg, rgb(103, 65, 217) 0%, rgb(194, 37, 92) 100%)"
                                : "#212529",
                            border: '5px solid transparent',
                            color: 'white',
                            width: isMobileResponsive ? "100%" : "9vw",
                            marginBottom: isMobileResponsive ? "10px" : "0",
                            marginRight: isMobileResponsive ? "10px" : "0",
                            padding: "20px",
                            borderRadius: "5px",
                            position: "relative",
                            marginLeft: "10px",
                            marginTop: "10px",
                        }
                        return (
                            <div key={index} style={cardStyle} onClick={() => handleCardClick(dateKey, index)}>
                                <div style={{
                                    fontSize: '48px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <img style={{ width: '25px', height: '25px' }} alt={habitName} src={img} />
                                </div>
                                <div style={{
                                    display: 'flex',
                                    paddingTop: '10px',
                                    justifyContent: 'center',
                                }}>
                                    {habitName}
                                </div>
                                {/*<div style={{*/}
                                {/*    position: 'absolute',*/}
                                {/*    top: '10px',*/}
                                {/*    right: '10px',*/}
                                {/*    color: 'white',*/}
                                {/*    cursor: 'pointer',*/}
                                {/*}}>*/}
                                {/*    <MoreVertIcon onClick={handlePopoverOpen} />*/}
                                    {/*<Popover open={open} anchorEl={anchorEl} anchorOrigin={{*/}
                                    {/*    vertical: "bottom",*/}
                                    {/*    horizontal: 'left',*/}
                                    {/*}} onClose={handlePopoverClose} >*/}
                                    {/*    <div style={{*/}
                                    {/*        background: '#25262b',*/}
                                    {/*        color: '#c1c2c5',*/}
                                    {/*        width: '10vw',*/}
                                    {/*        cursor: 'pointer',*/}
                                    {/*    }}>*/}
                                    {/*        Copy to my profile*/}
                                    {/*    </div>*/}
                                    {/*</Popover>*/}
                                {/*</div>*/}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default AddHabit;