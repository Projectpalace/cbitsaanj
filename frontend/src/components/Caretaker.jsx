import Navbar2 from "./Navbar2";
import Patient_tag from "./Patient_tag";
import './Caretaker.css';
import { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Caretaker = ( )=> {
    const navigate=useNavigate();
    const [dispaly, setdisplay]=useState(0)
    const [patient,setpatient]=useState(null)
    const [list,setlist]=useState([])
    const GetPatientList=()=>{
        axios.post("/en/getpatients")
          .then((response) => response.data)
          .then((data) => setlist(data))
          .catch((error) => {
            console.error("Error fetching patient list:", error);
          });
      }
      useEffect(()=>{
        GetPatientList();
      })
    return(
        <div>
            <button className="ctpatlist" onClick={()=>navigate('/')}>Back</button>
            <div className="ctstage">
            {list.length!==0 && list.map((pat,index)=>(
                      <Patient_tag key={index} setdisplay={setdisplay} setpatient={setpatient} pat={pat}/>
                  ))}
        </div>
        </div>
        
    )
}

export default Caretaker;