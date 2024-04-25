
import Navbar from './Navbar';
import './Main.css';
import Patient_tag from './Patient_tag';
import ReportViewer from './Report_pdf';
import { PDFViewer } from '@react-pdf/renderer';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import TouchDrawing from './Doctors_priscription';

// Your render function
<Viewer fileUrl="/path/to/document.pdf" />;

const Main=()=>{

    return(
      <div className='Main_body'>
      <div className='Navbar'>
        <Navbar/>
      </div>
      <div className='stage'>

        {/* <TouchDrawing/> ---- priscription*/} 


          {/* <Patient_tag/>
          <Patient_tag/> ------------patient tags 
          <Patient_tag/>
          <Patient_tag/>
          <Patient_tag/>
          <Patient_tag/> */}




{/* <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"--------reports>
  <div className='document'>
<Viewer fileUrl='https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf' />;
</div>
</Worker> */}




        </div>
        
      </div>
    )
}

export default Main;