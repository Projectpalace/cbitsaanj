const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
patientSchema = new mongoose.Schema({
    patientID:Number,
    name: String,
    DOB:Date,
    gender: String,
    chronics:Array,//Chronical diseases like diabetes,BP
    phone:Number,
    reportsList:Array,//latest report is at 0 index
    bloodGroup:String,
})
oldAgeHomeSchema=new mongoose.Schema({
    name:String,
    doctors:Array,
    patients:Array,
    address:String,
    contact:Number,
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
    doctorNotes: ObjectId//prescribtion
  });

doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String
});

const patient = mongoose.model('patient', patientSchema);
const report = mongoose.model('report', reportSchema);
const oldAgeHome = mongoose.model('oldAgeHome', oldAgeHomeSchema);
const doctor = mongoose.model('doctor', doctorSchema);

module.exports = { patient, report , oldAgeHome, doctor}