import React from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Popover,  } from "@mui/material";

const Habit = ({ habitName, img, handlePopoverOpen, handlePopoverClose, anchorEl }) => {
    const open = Boolean(anchorEl);
    return (
    <>
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
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'white',
            cursor: 'pointer',
        }}>
            <MoreVertIcon onClick={handlePopoverOpen} />
            <Popover open={open} anchorEl={anchorEl} anchorOrigin={{
                vertical: "bottom",
                horizontal: 'left',
            }} onClose={handlePopoverClose} >
                <div style={{
                    background: '#25262b',
                    color: '#c1c2c5',
                    width: '10vw',
                    cursor: 'pointer',
                }}>
                    Copy to my profile
                </div>
            </Popover>
        </div>
    </>
    )
}

export default Habit