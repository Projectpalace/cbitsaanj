import './Patient_tag.css';
import { useEffect, useState } from 'react';

const Patient_tag =({setdisplay,pat,setpatient})=>
{
    const [age, setAge] = useState(null);

    useEffect(() => {
        const dob = new Date(pat.dob);
        const today = new Date();
        let ageValue = today.getFullYear() - dob.getFullYear();
        let m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            ageValue--;
        }

        setAge(ageValue);
    }, [pat.dob]);

    return(
    
        <div className="Patient_tag" onClick={() =>setdisplay(1)}>
            <div className="patient_details">
            <div className="patient_name">
                <p>
                   Patient name:  <strong>
                    {pat.name}
                   </strong>
                </p>
                
            </div>
            <div className="patient_name">
                <p>
                   Blood-Group:  <strong>
                    {pat.blood_group}
                   </strong>
                </p>
                
            </div>
            <div className="patient_name">
                <p>
                   age:  <strong>
                    {age}
                   </strong>
                </p>
                
            </div>
            <div className="Patient_name">
                <p>
                   Sex:  <strong>
                    {pat.gender}
                   </strong>
                </p>
                
            </div>
            <div className="patient_name">
                <p>
                   Phone No:  <strong>
                    {pat.Phone}
                   </strong>
                </p>
                
            </div>
            
            <div className="patient_name">
                <p>
                   patient-ID:  <strong>
                    {"#"+pat._id}
                   </strong>
                </p>
                
            </div>
        </div>
        <div className="patient_disc">
            <p>
                <strong>
                    This patient has {pat.Chronics.length} chronic diseases
                </strong>
                
            </p>
        </div>
      </div>
    );
}

export default Patient_tag;