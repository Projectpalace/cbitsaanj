const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const { report, patient, oldAgeHome, doctor } = require("../Schema.js");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
