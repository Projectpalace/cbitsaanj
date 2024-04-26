import Navbar2 from "./Navbar2";
import Patient_tag from "./Patient_tag";
import './Caretaker.css';
import { useState } from "react";


const Caretaker = ( )=> {
    const [dispaly, setdisplay]=useState(0)
    return(
        <div>
            <button className="ctpatlist">Patient List</button>
            <div className="ctstage">
            <Patient_tag setdisplay={setdisplay}/>
            <Patient_tag setdisplay={setdisplay}/>
            <Patient_tag setdisplay={setdisplay}/>
            <Patient_tag setdisplay={setdisplay}/>
            <Patient_tag setdisplay={setdisplay}/>
            <Patient_tag setdisplay={setdisplay}/>
        </div>
        </div>
        
    )
}

export default Caretaker;