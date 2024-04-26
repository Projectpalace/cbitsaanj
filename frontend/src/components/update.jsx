// React Component
import React, { useState } from 'react';
import axios from 'axios';
import './update.css'

const FileUpload = () => {
  const [chatResponse, setChatResponse] = useState("");
  const [formattedResponse, setFormattedResponse] = useState("");
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    console.log("formdata: ")
    const formData = new FormData();
    formData.append('pdf', file);
    console.log("formdata",formData)
    

    // First axios request to /api/upload
    axios.post('/api/upload', formData)
      
      .then(response => {
        // Store the chat response in state
        setChatResponse(response.data.message);
        // Send the chat response to the '/api/format' endpoint
        return axios.post('/en/format', { message: response.data.message,pdfid:response.data.pdfid });
      })
      .then(formatResponse => {
        // Store the formatted response in state
        setFormattedResponse(formatResponse.data.message);
        
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className='upload_container'>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      <p>{chatResponse}</p>
      <br /> 
      <p>{formattedResponse}</p>


{/* 

       <div class="container">
  <h2>Upload Report</h2>
  <div>
      <input id="file-upload" className="input-file" type="file" accept="application/pdf" onChange={onFileChange} />
      <label htmlFor="file">Upload File</label>
      <button className="upload-button" onClick={onFileUpload}>Upload</button>
    </div>
  <p>{chatResponse}</p> */}
  
</div>

   



  );
};

export default FileUpload;