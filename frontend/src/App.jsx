import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main';
import Home from './components/Home';
import Caretaker from './components/Caretaker';
import FileUpload from './components/update';
import Addpatientform from './components/Addpatientform';
import Reportupload from './components/Reportupload';
export default function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/addpatient' element={<Addpatientform/>}/>
                    <Route path='/doctor' element={<Main/>}/>
                    <Route path='/ct' element={<Caretaker/>}/>
                    <Route path='/upload' element={<Reportupload/>}/>
                </Routes>
            </Router>
        </div>
    );
}
