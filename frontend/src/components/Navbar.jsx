import './Navbar.css';
import Patient_tag from './Patient_tag';

const Navbar =(setdisplay)=>{
    return(
        <div className="Navbar">
            <button onClick={()=>setdispaly(1)}>Details</button>
            <button onClick={()=>setdispaly(2)}>Reports</button>
            <button onClick={()=>setdispaly(3)}>Medical History</button>
            <button onClick={()=>setdispaly(4)}>Predictions</button>
        </div>
    )
}
export default Navbar