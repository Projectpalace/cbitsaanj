import { useState } from 'react';
import './Navbar.css';
import Patient_tag from './Patient_tag';

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
                <div>
                    <button>Details</button>
                    <button>Reports</button>
                    <button>Medical History</button>
                </div>
            ) : (
                <div>
                    <button>
                        Current Report Analysis
                    </button>
                    <button >
                        Risk Prediction
                    </button>
                    <button>Precautions</button>
                </div>
            )}
            <button onClick={switcher}>Predictions</button>
        </div>
    );
};
export default Navbar;
