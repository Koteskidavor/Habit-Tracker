import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import CheckboxOption from "./CheckboxOption";
import "./Popup.css";
const Popup = ({
  close,
  handleAddNewHabitOpen,
  habitRenderer,
  handleCancelClick,
  handleAddNewHabitClick,
  open,
  handleSubmit,
  handleCheckboxClick,
  checkedHabits,
  dateKey,
  dayKey,
  isAddingHabit,
  newImg,
  setNewImg,
  newHabit,
  setNewHabit,
  habitOption,
  handleOptionChange,
  isMobileResponsive,
}) => {
  return (
    <Dialog open={open} onClose={handleSubmit}>
      <DialogTitle className="dialog-title">Organize your Day</DialogTitle>
      <DialogContent className="content">
        <div className="main-content">
          <div className="main-content">
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
                <div className="button-container">
                  <button
                    className="button-actions"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="button-actions"
                    onClick={handleAddNewHabitClick}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="habit-wrapper">
                {habitRenderer.map((habit, index) => {
                  const isSelected =
                    (checkedHabits[dateKey] &&
                      checkedHabits[dateKey].includes(habit.habit)) ||
                    (checkedHabits[dayKey] &&
                      checkedHabits[dayKey].includes(habit.habit));
                  return (
                    <div
                      key={index}
                      className={
                        isMobileResponsive
                          ? "popup-habitsResponsive popup-habits"
                          : "popup-habits"
                      }
                    >
                      <div
                        onClick={() => handleCheckboxClick(index)}
                        className="checked-box"
                      >
                        {isSelected && <CheckCircleIcon />}
                      </div>
                      <div className="image-container">
                        <img
                          className="img"
                          draggable="false"
                          alt={habit.name}
                          src={habit.img}
                        />
                      </div>
                      <div className="habit-title">{habit.habit}</div>
                    </div>
                  );
                })}
                <Button className="add-icon" onClick={handleAddNewHabitOpen}>
                  <AddIcon />
                </Button>
              </div>
            )}
          </div>
          {isAddingHabit ? null : (
            <div className="weekdays">
              <CheckboxOption
                label="Monday"
                value="Monday"
                checked={habitOption === "Monday"}
                onChange={handleOptionChange}
              />
              <CheckboxOption
                label="Tuesday"
                value="Tuesday"
                checked={habitOption === "Tuesday"}
                onChange={handleOptionChange}
              />
              <CheckboxOption
                label="Wednesday"
                value="Wednesday"
                checked={habitOption === "Wednesday"}
                onChange={handleOptionChange}
              />
              <CheckboxOption
                label="Thursday"
                value="Thursday"
                checked={habitOption === "Thursday"}
                onChange={handleOptionChange}
              />
              <CheckboxOption
                label="Friday"
                value="Friday"
                checked={habitOption === "Friday"}
                onChange={handleOptionChange}
              />
              <CheckboxOption
                label="Saturday"
                value="Saturday"
                checked={habitOption === "Saturday"}
                onChange={handleOptionChange}
              />
              <CheckboxOption
                label="Sunday"
                value="Sunday"
                checked={habitOption === "Sunday"}
                onChange={handleOptionChange}
              />
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
  );
};

export default Popup;
