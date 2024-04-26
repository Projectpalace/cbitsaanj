const router = require('express').Router();
const {welcome} = require('./controllers/functions')
const {uploadFile,formatFile} = require('./controllers/llmapis')
router.post('/welcome',welcome)
router.post('/upload',uploadFile)
router.post('/format',formatFile)
module.exports = router