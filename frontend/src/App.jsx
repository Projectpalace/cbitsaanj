import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import DoctorHome from "./components/Doctor's_Home";
import Main from "./components/main";

export default function App() {
  return (
    <div className='App'>
      <Main/>
        <Router>
      <Routes>
        {/* <Route exact path="/" component={Main} />
        <Route path="/caretaker" component={Caretaker} /> */}
        {/* <Route path="/doctor" component={DoctorHome} /> */}
        <Route path="/" component={Main} />
      </Routes>
    </Router>
    </div>
    
  );
}
