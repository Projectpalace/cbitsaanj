import React from 'react'
import './Addpatientform.css'

function Addpatientform() {
    return (
        <div className='body_form'>

       
    <div class="form-container">
        <h2>Patient Information Form</h2>
        <form action="/submit" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required/>
            </div>
            <div class="form-group">
                <label for="bloodGroup">Blood Group</label>
                <select id="bloodGroup" name="bloodGroup" required>
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" required/>
            </div>
            <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" name="dob" required/>
            </div>
            <div class="form-group">
                <label for="history">Patient History</label>
                <textarea id="history" name="history" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>


        </div>
    )
}

export default Addpatientform
