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

const Main = () => {
  const [patient,setpatient]=useState(null)
  const [display,setdisplay]=useState(0)
    return (
        <div className='Main_body'>
            <div>
              {
                display===0 ? <Navbar2 setdisplay={setdisplay}/> : <Navbar setdisplay={setdisplay}/>
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
                : display===1 ?
                  <Report_pdf patient={patient}/>
                  :<TouchDrawing/>
              }
            </div>
        </div>
    );
};

export default Main;
