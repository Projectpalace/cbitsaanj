import Navbar from './Navbar';
import './Main.css';
import Navbar2 from './Navbar2';
import Patient_tag from './Patient_tag';
import Report_pdf from './Report_pdf';
import { PDFViewer } from '@react-pdf/renderer';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import TouchDrawing from './Doctors_priscription';
import { useState } from 'react';
import PopupButton from './Popup';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

const Main = () => {
  const navigate=useNavigate();
  const [patient,setpatient]=useState(null)
  const [display,setdisplay]=useState(0)
  const [Prescribe,setprescribe]=useState(false)
  const back=() => {
    if(display===1){
      setdisplay(0);
    }
    else if (display===0){
      navigate('/')
    }
  }
    return (
        <div className='Main_body'>

        
           
            <div>
              {
                display===0 ? <Navbar2 setdisplay={setdisplay}/> : <Navbar setdisplay={setdisplay}/>
              }
            </div>
            <div className='subnavbar'>
            <button id="back_button" onClick={back}>Back</button>
            {
              display!==0 && <button id='prescription' onClick={()=>setprescribe(!Prescribe)}>Prescribe</button>
            }
            
            </div>
            
            <div className='stage'>
              {
                display===0 ?
                <div>
                  <Patient_tag setdisplay={setdisplay} setpatient={setpatient}/> 
                  <Patient_tag setdisplay={setdisplay} setpatient={setpatient}/>
                  <Patient_tag setdisplay={setdisplay} setpatient={setpatient}/>
                  <Patient_tag setdisplay={setdisplay} setpatient={setpatient}/>
                  <Patient_tag setdisplay={setdisplay} setpatient={setpatient}/>
                </div>
                :<Report_pdf patient={patient}/>
              }
              <Popup Prescribe={Prescribe} setprescribe={setprescribe}/>
            </div>
        </div>
    );
};

export default Main;
