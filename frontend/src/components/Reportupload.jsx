import React from 'react'
import './Reportupload.css'
function Reportupload() {
    return (
        <div className='body'>
             <div class="upload-container">
        <h2>Upload Your PDF</h2>
        <form action="/upload" method="post" enctype="multipart/form-data">
            <label for="pdfUpload" class="custom-file-upload">Choose a PDF file</label>
            <input type="file" id="pdfUpload" name="pdfUpload" accept="application/pdf" required/>
            <br/>
            <button type="submit" class="upload-button">Upload</button>
        </form>
    </div>


        </div>
    )
}

export default Reportupload
