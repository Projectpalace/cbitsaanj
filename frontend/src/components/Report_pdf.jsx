import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import './Main.css'
import { useState } from 'react';
export default function Report_pdf(patient) {
    const [a,seta]=useState(patient.patient.reportfiles)
    console.log(a,patient)
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className='document'>
                <Viewer fileUrl='https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf' />;
            </div>
        </Worker>
)}