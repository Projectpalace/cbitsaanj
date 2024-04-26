import { useState,useEffect } from 'react';
import './Navbar.css';
import Patient_tag from './Patient_tag';
import axios from 'axios';

const Navbar = ({ setdisplay}) => {
    const getResponseText = async () => {
        const response = await axios.get('/en/getresponse');
        return response.data;
    }
    const [responseText, setResponseText] = useState();

    useEffect(() => {
        getResponseText().then((text) => setResponseText(text));
    }, []);
    console.log(responseText);

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
                    <button>Details</button>
                    <button>Reports</button>
                    <button>Medical History</button>
                    <button onClick={switcher}>Open analysis</button>
                </div>
            ) : (
                <div className='Navbar'>
                    <button id="analysis">
                        Report Analysis
                    </button>
                    <button id="analysis">
                        Risk Prediction
                    </button>
                    <button id="analysis">Precautions</button>
                    <button id='analysis'onClick={switcher}>Close Analysis</button>
                </div>
            )}
            
        </div>
    );
};
export default Navbar;
