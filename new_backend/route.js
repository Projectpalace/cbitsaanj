const router = require('express').Router();
const {getReport, getPatient, setPatient, getPatients, getOldageHomeInfo} = require('./controllers/get_set')
const {uploadReport} = require('./controllers/LLM')
router.get('/getreport', getReport)
router.post('/setPatient',setPatient)
router.get('/getpatient', getPatient)
router.get('/getpatients', getPatients)
router.get('/getoldagehomeinfo', getOldageHomeInfo)
router.post('/upload', uploadReport)

module.exports = router