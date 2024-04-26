import { useNavigate } from "react-router-dom";
import './Home.css'
const Home =()=>{
    const navigate=useNavigate();
    return(
        <div className="Home">
            <button id="doctor" onClick={()=>navigate('/doctor')}>
                Doctor 
            </button>
            <button id="care_taker" onClick={()=>navigate('/ct')}>
                Care Taker
            </button>
        </div>
    )
}

export default Home;
