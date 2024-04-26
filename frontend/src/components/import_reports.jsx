import React, { useState } from 'react';
import './import_report.css'

const Reportupload = () => {
  // Use React's useState hook to manage file selection
  const [file, setFile] = useState(null);

  // Handler for file input change event
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if a file is selected
    if (file) {
      const formData = new FormData(); // Create a new FormData object
      formData.append('file', file); // Append the file to the FormData object

      // Make a POST request to upload the file
      fetch('/upload', {
        method: 'POST',
        body: formData, // Send the FormData object with the request
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          console.log('File uploaded successfully:', data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div className="kiosk">
      <h1>Upload Your File</h1>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <input type="file" onChange={handleFileChange} required />
        <br />
        <button className="upload" type="submit">Upload</button>
      </form>
      <div className="footer">
        Please ensure your file does not contain sensitive information.
      </div>
    </div>
  );
};

export default Reportupload;
