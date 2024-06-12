const router = require('express').Router();
const {getReport, getPatient, getPatients, getOldageHomeInfo} = require('./controllers/get_set')

router.get('/getreport', getReport)
router.get('/getpatient', getPatient)
router.get('/getpatients', getPatients)
router.get('/getoldagehomeinfo', getOldageHomeInfo)

module.exports = router