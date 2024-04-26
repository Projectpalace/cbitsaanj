import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main';
import Home from './components/Home';
import Caretaker from './components/Caretaker';
import FileUpload from './components/update';
import SpeechToText from './components/chatbot';
import Recording from './components/Recording';
export default function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/doctor' element={<Main/>}/>
                    <Route path='/ct' element={<Caretaker/>}/>
                    <Route path='/upload' element={<FileUpload/>}/>
                    <Route path='/cb' element={<SpeechToText/>}/>
                    <Route path='/recording' element={<Recording/>}/>
                </Routes>
            </Router>
        </div>
    );
}
