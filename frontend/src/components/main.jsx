
import Navbar from './Navbar';
import './Main.css';
import Patient_tag from './Patient_tag';

const Main=()=>{

    return(
      <div className='Main_body'>
      <div className='Navbar'>
        <Navbar/>
      </div>
      <div className='stage'>
          <Patient_tag/>
          <Patient_tag/>
          <Patient_tag/>
          <Patient_tag/>
          <Patient_tag/>
          <Patient_tag/>
        </div>
        
      </div>
    )
}

export default Main;