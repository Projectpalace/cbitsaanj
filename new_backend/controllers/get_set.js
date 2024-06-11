const mongoose = require('mongoose');
const { report, patient, oldAgeHome, doctor } = require("../Schema.js");



const getReport = async (req, res) => {
    try {
        const id = req.params.id;
        const reportInfo = await report.findOne({ _id: id });
        res.json(reportInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}

const getPatient = async (req,res) => {
    const id = req.params.id;
    const patientInfo =await patient.findOne({_id:id});
    res.json(patientInfo);
}

const getPatients = async (req,res) => {
    try{
        const patients = await oldAgeHome.findOne().select('patients'); // TODO: add session oldagehome query
        res.json(patients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve patients'});
    }
}

const getOldageHomeInfo = async (req,res) => {
    try{
        const name = req.params.name;
        const oldAgeHomeDetails = await oldAgeHome.findOne(); // TODO: add session oldagehome query
        res.json(oldAgeHomeDetails);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve old age home details'});
    }
}

module.exports = { getReport, getPatient, getPatients, getOldageHomeInfo }