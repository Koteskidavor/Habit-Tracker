import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import './HabitRenderer.css';
const HabitRenderer = ({ open, hover, expanded, handleExpandIconClick, img, alt, type }) => {
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
            <IconButton className="add-icon">
                <AddIcon />
            </IconButton>
            <Dialog
                open={open}
                // onClose={}
            >
                <DialogTitle className="dialog-title">
                    Organize your Day
                </DialogTitle>
                <DialogContent className="content">
                    <div className="main-content" >
                        <div className="main-content" >

                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default HabitRenderer;