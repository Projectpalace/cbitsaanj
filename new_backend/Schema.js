const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
PatientSchema = new mongoose.Schema({
    patientID:Number,
    name: String,
    DOB:Date,
    gender: String,
    chronics:Array,//Chronical diseases like diabetes,BP
    phone:Number,
    reportsList:Array,//latest report is at 0 index
    bloodGroup:String,

})
reportSchema = new mongoose.Schema({
    patient: String,
    patientId:ObjectId,
    doctor: String,
    file: ObjectId,
    dateOfReport: Date,
    precautions: Array,
    severity:Number,
    summary: String,
    possibleDiseases: Array,
    doctorNotes: ObjectId
  });

const Patient = mongoose.model('Patient', PatientSchema);
const Report = mongoose.model('Report', reportSchema);

module.exports = { Patient, Report }