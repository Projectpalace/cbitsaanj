const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const {Voice,report,Patient} = require('../models');

const app = express();
app.use(cors());
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const welcome =(req,res) => {
    res.json("Welcomeeee")
}

const record=(req, res)=> {
  return new Promise(async (resolve, reject) => {
    try {
      const voice = new Voice({
        voiceData: req.file.buffer,
      });
      const savedVoice = await voice.save();
      console.log("all ok")
      resolve(res.status(201).json({ message: 'Voice recorded successfully', recordingId: savedVoice._id }));
    } catch (error) {
      console.error(error);
      reject(res.status(500).json({ error: 'Failed to save voice recording' }));
    }
  });
}
const playrecording =async(req,res)=>{
    try {
        const recordingId = req.params.id;
        const voice = await Voice.findById(recordingId);
        if (!voice) {
          return res.status(404).json({ error: 'Recording not found' });
        }
        res.set('Content-Type', 'audio/wav');
        res.send(voice.voiceData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve recording' });
      }
}

const getreports = async (req, res) => {
  try {
    const id=req.body.id
    const reports = await report.findOne({_id:id});
    res.json(reports.reportfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve reports' });
  }
}

const getpatient=async(req,res)=>{
  const id=req.body.id;
  const patient=await Patient.findOne({_id:id});
  res.json(patient)
}

const gethistory=async(req,res)=>{
  const id=req.body.id;
  const history=await Patient.findOne({_id:id});
  res.json(history.history);
}

const getpatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
}

module.exports = {
    welcome,
    record,
    playrecording,
    getreports,
    getpatient,
    gethistory,
    getpatients
}
