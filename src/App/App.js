import './App.css';
import React, { useState, useEffect, useRef } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LoginAndSignUp from '../LoginAndSignUp/LoginAndSignUp';
import ResetPassword from "../ResetPassword/ResetPassword";
import MainPage from "../MainPage/MainPage";
import Map from '../Map/Map';
import ViewJourney from '../ViewJourney/ViewJourney';

const App = () => {

   const [submittedJourney, setSubmittedJourney] = useState({
    });

    const [allJourneyLegs, setAllJourneyLegs] = useState([])

    const [firstRender, setFirstRender] = useState(true)

    const [legId, setLegId] = useState(1)


    useEffect(() => {
        if (firstRender){
            setFirstRender(false)
        } else {
        setAllJourneyLegs([...allJourneyLegs, submittedJourney])}
    }, [submittedJourney])

    return (
        <Router>
            <>
            <Routes>
                <Route path = "/" element={<LoginAndSignUp/>}/>
                <Route path="/ResetPassword" element={<ResetPassword/>}/>
                <Route path="/MainPage" element={<MainPage setSubmittedJourney={setSubmittedJourney} legId={legId} setLegId={setLegId}/>}/>
                <Route path="/ViewJourney" element={<ViewJourney 
                allJourneyLegs={allJourneyLegs} setAllJourneyLegs={setAllJourneyLegs} setLegId={setLegId}/>}/>
            </Routes>
          </>
        </Router>
    );
}

export default App;