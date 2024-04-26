import { useState,useEffect } from 'react';
import './Navbar.css';
import Patient_tag from './Patient_tag';
import axios from 'axios';

const Navbar = ({ setdisplay}) => {
    

    const [navdisplay,setnavdisplay]=useState(0)
    const switcher=()=>{
        if (navdisplay===0){
            setnavdisplay(1)
        }
        else{
            setnavdisplay(0)
        }
    }
    return (
        <div className='Navbar'>
            {navdisplay === 0 ? (
                <div className='Navbar'>
                    <button onClick={()=>setdisplay(6)}>Details</button>
                    <button onClick={()=>setdisplay(7)}>Reports</button>
                    <button onClick={()=>setdisplay(8)}>Medical History</button>
                    <button onClick={switcher}>Open analysis</button>
                </div>
            ) : (
                <div className='Navbar'>
                    <button id="analysis" onClick={()=>setdisplay(3)}>
                        Report Analysis
                    </button>
                    <button id="analysis" onClick={()=>setdisplay(4)}>
                        Risk Prediction
                    </button>
                    <button id="analysis" onClick={()=>setdisplay(5)} >Precautions</button>
                    <button id='analysis'onClick={switcher}>Close Analysis</button>
                </div>
            )}
            
        </div>
    );
};
export default Navbar;
