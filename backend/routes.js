const router = require('express').Router();
const {welcome} = require('.controllers/functions')
router.post('/welcome',welcome)
module.exports = router