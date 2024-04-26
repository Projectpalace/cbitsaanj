import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorHome from "./components/Doctor's_Home";
import Main from './components/main';

export default function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    {/* <Route exact path="/" component={Main} />
        <Route path="/caretaker" component={Caretaker} /> */}
                    <Route path='/' element={<Main/>} />
                    <Route path='/doctor' element={<DoctorHome/>} />
                </Routes>
            </Router>
        </div>
    );
}
