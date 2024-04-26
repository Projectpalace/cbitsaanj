import React, { useState } from 'react';
import './Popup.css'; // You may need to create this CSS file to include the styles

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
    disableOtherButtons();
  };

  const closePopup = () => {
    setPopupOpen(false);
    enableOtherButtons();
  };

  const disableOtherButtons = () => {
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].id !== "popupButton") {
        buttons[i].disabled = true;
      }
    }
  };

  const enableOtherButtons = () => {
    const buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
  };

  return (
    <div>
      <button id="popupButton" onClick={openPopup}>Click Me</button>

      {isPopupOpen && (
        <div className="popup">
          <span className="close" onClick={closePopup}>&times;</span>
          <p>This is a pop-up div!</p>
        </div>
      )}

      {isPopupOpen && <div id="overlay"></div>}
    </div>
  );
}

export default App;
