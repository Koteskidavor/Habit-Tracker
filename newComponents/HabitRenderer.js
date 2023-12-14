import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import Popup from './Popup';

import './HabitRenderer.css';
const HabitRenderer = ({ open, handleOpenDialog, close, handleSubmit, hover, expanded, handleExpandIconClick, img, alt, type, habitRenderer }) => {
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
            <IconButton className="add-icon" onClick={handleOpenDialog}>
                <AddIcon />
            </IconButton>
            <Popup open={open} handleSubmit={handleSubmit} habitRenderer={habitRenderer} />
            {!expanded && (
                <div></div>
            )}
        </div>
    )
}

export default HabitRenderer;