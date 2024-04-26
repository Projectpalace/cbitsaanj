import React, { useEffect, useState } from 'react';
import './Popup.css';
import TouchDrawing from './Doctors_priscription';

const Popup = ({Prescribe,setprescribe}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(prevState => !prevState);
    if (!showPopup) {
      document.body.classList.add('popup-active'); 
    } else {
      setprescribe(!Prescribe)
      document.body.classList.remove('popup-active'); 
    }
  };
  useEffect(()=>{
    if(Prescribe){
      togglePopup()
    }
  },[Prescribe])

  return (
    <div>
      {Prescribe && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <span className="close" onClick={togglePopup}>&times;</span>
            <TouchDrawing/>
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
