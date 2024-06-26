const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
PatientSchema = new mongoose.Schema({
    name: String,
    dob:Date,
    gender: String,
    Chronics:Array,
    Phone:Number,
    history:Array,
    personalprescriptions:Array,
    report:Array,
    reportfiles:Array,
    blood_group:String,
})
caretakerSchema = new mongoose.Schema({
    name: String,
    Homename:String,
})
voiceSchema = new mongoose.Schema({
    voiceData: Buffer,
  });
  
reportSchema = new mongoose.Schema({
    patient: ObjectId,
    doctor: ObjectId,
    File: ObjectId,
    dateopen: Date,
    symptoms: Array,
    fileclosed: Boolean,
    suggtreats: Array,
    summary: Array,
    measures: Array,
    improveSuggestions: Array,
    doctornotes: Array,
    Medications: Array
  });
DoctorSchema = new mongoose.Schema({
    name: String,
    docsince:Date,
    specialization:String,
    phone:Number,
    patients:Array,
    reportfiles:Array,
})
const pdfSchema = new mongoose.Schema({
  name: String,
  content: Buffer
});



const PdfModel = mongoose.model('Pdf', pdfSchema);
const Patient = mongoose.model('Patient', PatientSchema)
const caretaker = mongoose.model('caretaker', caretakerSchema)
const report = mongoose.model('report', reportSchema)
const Voice = mongoose.model('Voice', voiceSchema);
const doctor = mongoose.model('doctor', DoctorSchema)

module.exports = { Patient, caretaker, report, doctor ,Voice,PdfModel}