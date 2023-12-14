import React, {useEffect, useState} from 'react';
import "./App.css";
import Page from './newComponents/page';
// import HabitTracker from './components/HabitTracker'
function App() {
    return (
        <div className="App dark-mode">
            {/*<HabitTracker />*/}
            <Page />
        </div>
  );
}

export default App;
