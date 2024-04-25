import './Navbar.css';
import Patient_tag from './Patient_tag';

const Navbar =({setdisplay})=>{
    return(
        <div className="Navbar">
            <button onClick={() => setdisplay(0)}>Details</button>
            <button onClick={() => setdisplay(0)}>Reports</button>
            <button onClick={() => setdisplay(0)}>Medical History</button>
            <button onClick={() => setdisplay(0)}>Predictions</button>
        </div>
    );
};
export default Navbar;
