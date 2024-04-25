import { useState } from 'react';
import Navbar from './Navbar';
import Patient_tag from './Patient_tag';

const Main=()=>{
    const [patient,setpatient]=useState(null);
    const [details, setdetails]=usestate(1);


    return(
        <div className="App">
      <div className='Navbar'>
        <Navbar setdetails={setdetails}/>
      </div>
      <div className='stage'>
           { display===1 ? () : (display===2 ? () : (display ===3 ? () : (display===4 ? () : (<p> nothinf here</p>)))}
        </div>
        
      </div>
    )
}