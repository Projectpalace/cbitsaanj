import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import DoctorHome from "./components/Doctor's_Home";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" component={Main} />
        <Route path="/caretaker" component={Caretaker} /> */}
        <Route path="/doctor" component={DoctorHome} />
      </Routes>
    </Router>
  );
}
