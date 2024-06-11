const mongoose = require('mongoose');
const { Report, Patient, oldAgeHome, doctor } = require("../Schema.js");



const getReport = async (req, res) => {
    try {
        const id = req.body.id;
        const report = await Report.findOne({ _id: id });
        res.json(report);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}

const getPatient = async (req,res) => {
    const id = req.body.id;
    const patient =await Patient.findOne({_id:id});
    res.json(patient);
}

const getPatients = async (req,res) => {
    try{
        const patients = await Patient.find();
        res.json(patients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve patients'});
    }
}

const getOldageHomeInfo = async (req,res) => {
    try{
        const name = req.body.name;
        const oldAgeHomeDetails = await oldAgeHome.findOne({name : name});
        res.json(oldAgeHomeDetails);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve old age home details'});
    }
}