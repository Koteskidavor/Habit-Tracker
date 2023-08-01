import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddHabit = ({ open, handleClose, handleSubmit, habitRenderer, handleCheckboxClick, dayOfWeek, checkedHabits, isMobileResponsive }) => {
    return (
        <Dialog open={open} onClose={handleSubmit} >
            <DialogTitle style={{ background: '#c1c2c5', textAlign: 'center', }}>Organize your Day</DialogTitle>
            <DialogContent style={{ background: '#c1c2c5', height: '40vh', overflowY: 'auto', }}>
                <div style={{ display: 'flex', marginTop: '15px', height: '40vh', flexWrap: 'wrap'}}>
                    {habitRenderer.map((habit, index) => {
                        const isSelected = checkedHabits[dayOfWeek] && checkedHabits[dayOfWeek].includes(habit.habit);
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
    )
}

export default AddHabit;