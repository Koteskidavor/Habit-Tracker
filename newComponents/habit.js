import React from "react";


const Habit = ({habitName, index, dateKey, img, handleCardClick, isHabitClicked, isMobileResponsive}) => {
    const cardStyle = {
        background: isHabitClicked
            ? "linear-gradient(rgb(52, 58, 64), rgb(52, 58, 64)) padding-box padding-box, linear-gradient(45deg, rgb(103, 65, 217) 0%, rgb(194, 37, 92) 100%)"
            : "#212529",
        border: "5px solid transparent",
        color: "white",
        width: isMobileResponsive ? "100%" : "9vw",
        marginBottom: isMobileResponsive ? "10px" : "0",
        marginRight: isMobileResponsive ? "10px" : "0",
        padding: "20px",
        borderRadius: "5px",
        position: "relative",
        marginLeft: "10px",
        marginTop: "10px",
    };

    return (
        <div
            key={index}
            style={cardStyle}
            onClick={() => handleCardClick(dateKey, index)}
        >
            <div
                style={{
                    fontSize: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    style={{width: "25px", height: "25px"}}
                    alt={habitName}
                    src={img}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    paddingTop: "10px",
                    justifyContent: "center",
                }}
            >
                {habitName}
            </div>
        </div>
    );
}

export default Habit;
