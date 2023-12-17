import React from "react";
import './habit.css';
const Habit = ({ checkedHabits, dateKey, dayKey, habitRenderer }) => {
    return (
        <div>
            {(checkedHabits[dateKey] || checkedHabits[dayKey])?.map((habit, index) => {
                const habitDetails = habitRenderer.find(
                    (item) => item.habit === habit
                );
                if(!habitDetails) {
                    return null;
                }
                const { img, habit: habitName } = habitDetails;
                return (
                    <div key={index} className="card-style" >
                        <div className="habit-img" >
                            <img className="card-img" src={img} alt={habitName} />
                        </div>
                        <div className="habit-title" >
                            {habitName}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Habit;
