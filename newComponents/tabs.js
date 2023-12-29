import { Tab, Tabs } from "@mui/material";
import React from "react";

const HabitTabs = ({ selectedTab, handleTabChange }) => {
  const tabs = ["Day", "Week"];
  return (
    <Tabs value={selectedTab} onChange={handleTabChange}>
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab} value={index}/>
      ))}
    </Tabs>
  );
};

export default HabitTabs;
