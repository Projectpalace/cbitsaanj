import React, { useRef, useEffect, useState } from 'react';
import './Prescription.css';
import { jsPDF } from 'jspdf';
import axios from 'axios';

const TouchDrawing = () => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const [isDrawing, setIsDrawing] = useState(false); // State to track if the user is drawing

  // Function to get the current date in a readable format
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Display the doctor's name and the current date on the canvas
    const doctorName = 'Dr. Jane Doe';
    const currentDate = getCurrentDate();

    // Set the font and text color for the doctor's name and date
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';

    ctx.fillText(`Doctor: ${doctorName}`, 10, 30); // Position (x, y)
    ctx.fillText(`Date: ${currentDate}`, 10, 50); // Below the doctor's name

    const getPosition = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };

    const startDrawing = (e) => {
      setIsDrawing(true);
      const position = getPosition(e);
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      e.preventDefault(); // Prevent scrolling during drawing
      const position = getPosition(e);
      ctx.lineTo(position.x, position.y);
      ctx.strokeStyle = 'black'; // Set the color of the drawing
      ctx.lineWidth = 2; // Set the width of the line
      ctx.stroke();
    };

    const stopDrawing = () => {
      if (isDrawing) {
        setIsDrawing(false);
        ctx.closePath();
      }
    };

    // Add touch event listeners to the canvas
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      // Clean up event listeners when the component unmounts
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing]); // Effect dependency on isDrawing

  const savePdfToBackend = () => {
    const canvas = canvasRef.current;
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297); // Add canvas image to PDF

    // Convert PDF to Blob
    const blob = pdf.output('blob');

    // Create FormData object and append Blob
    const formData = new FormData();
    formData.append('file', blob, 'canvas_drawing.pdf');
    console.log(formData)

    // Send PDF data to backend using Axios
    axios.post('/upload', formData, {
      
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      // Handle response from backend if needed
      console.log('PDF saved to backend:', response.data);
    }).catch(error => {
      // Handle error if any
      console.error('Error saving PDF to backend:', error);
    });
  };

  return (
    <div>
      <canvas ref={canvasRef} width={950} height={670} style={{ border: '1px solid black', backgroundColor: 'white' }} />
      <button className='download_prescription' onClick={savePdfToBackend}>&#x2713;</button>
    </div>
  );
};

export default TouchDrawing;
