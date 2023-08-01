import React, {useEffect, useState} from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TodoList from './components/TodoList'
import Calendar from './components/Calendar';
import Notes from './components/Notes';
import WorldClock from './components/WorldClock';
import Chat from './components/Chat';
import TransactionForm from "./components/TransactionForm";
import TimeTracker from './components/TimeTracker';
import Feedback from "./components/Feedback";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from './components/Signup';
import HabitTracker from "./components/HabitTracker";
import AboutUs from './components/AboutUs';
function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(getDarkModeFromLocalStorage());

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    function getDarkModeFromLocalStorage() {
        const darkMode = localStorage.getItem('darkMode');
        return darkMode ? JSON.parse(darkMode) : false;
    }

    const toggleDarkMode = () => {
        const updatedDarkMode = !darkMode;
        setDarkMode(updatedDarkMode);
    }
    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <Router>
            {/*<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} path="/Sidebar" darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>*/}
            <Routes>
                {/*<Route path="/Home" element={<Home isOpen={isOpen} darkMode={darkMode} />} />*/}
                {/*<Route path="/TodoList" element={<TodoList darkMode={darkMode} />}/>*/}
                {/*<Route  path="/Calendar" element={<Calendar isOpen={isOpen} darkMode={darkMode} />} />*/}
                {/*<Route path="/SimpleNotes" element={<Notes isOpen={isOpen} darkMode={darkMode} />}/>*/}
                {/*<Route path="/WorldTime" element={<WorldClock darkMode={darkMode}  />} />*/}
                {/*<Route path="/Chat" element={<Chat darkMode={darkMode} />} />*/}
                {/*<Route path="/TransactionForm" element={<TransactionForm darkMode={darkMode} />} />*/}
                {/*<Route path="/TimeTracker" element={<TimeTracker darkMode={darkMode} />} />*/}
                {/*<Route path="/Signup" element={<Signup darkMode={darkMode} />} />*/}
                {/*<Route path="/Login" element={<Login darkMode={darkMode} />} />*/}
                {/*<Route path="/Feedback" element={<Feedback darkMode={darkMode} />} />*/}
                <Route path="/HabitTracker" element={<HabitTracker darkMode={darkMode} />} />
                {/*<Route path="/AboutUs" element={<AboutUs darkMode={darkMode} />} />*/}
            </Routes>
            </Router>
        </div>
  );
}

export default App;
