import './Patien_tag.css';

const Patient_tag =(props, setpatient)=>
{
    return(
    
        <div className="Patient_tag" onClick={()=>setpatient()}>
            <div class="patient_details">
            <div class="patient_name">
                <p>
                   Patient name:  <strong>
                    T.Nithin Chowdary
                   </strong>
                </p>
                
            </div>
            <div class="patient_name">
                <p>
                   Blood-Group:  <strong>
                    O+ve
                   </strong>
                </p>
                
            </div>
            <div class="patient_name">
                <p>
                   age:  <strong>
                    35
                   </strong>
                </p>
                
            </div>
            <div class="Patient_name">
                <p>
                   Sex:  <strong>
                    Male
                   </strong>
                </p>
                
            </div>
            <div class="patient_name">
                <p>
                   Phone No:  <strong>
                    8125611565
                   </strong>
                </p>
                
            </div>
            
            <div class="patient_name">
                <p>
                   patient-ID:  <strong>
                    #123$
                   </strong>
                </p>
                
            </div>
        </div>
        <div class="patient_disc">
            <p>
                <strong>
                    This is patint is not a patient he is healthy with all the
                 essential nutrition he has blood group o+ve and has all
                 organs working properly with thier condition at their best.
                </strong>
                
            </p>
        </div>
      </div>
    );
}

export default Patient_tag;