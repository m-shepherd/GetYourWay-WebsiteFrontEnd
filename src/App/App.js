import './App.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import LoginAndSignUp from '../LoginAndSignUp/LoginAndSignUp';
import ResetPassword from "../ResetPassword/ResetPassword";
import MainPage from "../MainPage/MainPage";
import Map from '../Map/Map';
import ViewJourney from '../ViewJourney/ViewJourney';

const App = () => {
    return (
        <Router>
            <>
            <Routes>
                <Route path = "/" element={<LoginAndSignUp/>}/>
                <Route path="/ResetPassword" element={<ResetPassword/>}/>
                <Route path="/MainPage" element={<MainPage/>}/>
                <Route path="/ViewJourney" element={<ViewJourney/>}/>
            </Routes>
          </>
        </Router>
    );
}

export default App;