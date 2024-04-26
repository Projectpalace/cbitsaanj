const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const app = express();
const pdfParse = require('pdf-parse');
const cors = require('cors');
app.use(express.json());

const bodyParser = require('body-parser');
const path = require('path');
const approute=require('./routes')


require('dotenv').config();
const {Voice,report,PdfModel} = require('./models');

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




// Create a model based on the schema

const upld = multer();


const uri = process.env.MONGO_URL
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.use(express.static(path.join(__dirname,'./build')));
app.get("/",cors(),(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./build', 'index.html'));
})






app.post('/record', upload.single('voice'), async (req, res) => {
  try {
    const voice = new Voice({
      voiceData: req.file.buffer,
    });
    const savedVoice = await voice.save();
    res.status(201).json({ message: 'Voice recorded successfully', recordingId: savedVoice._id });
    console.log("voice recorded sucessfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save voice recording' });
  }
});
app.get("/playrecording/:id" ,async (req, res) => {
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
});


app.post('/api/upload', upld.single('pdf'), async (req, res) => {
  try {
    console.log("hello");
    console.log(req.file.buffer)
    const pdf=req.file;
    console.log(pdf);
    const pdfBuffer = pdf.buffer; // Access the file buffer directly

    const newPdf = new PdfModel({
      name: req.file.originalname,
      content: pdfBuffer
    });
    await newPdf.save();
    

    const newReport = new report({
      patient: null,
      doctor: null,
      File: newPdf._id,
      dateopen: new Date(),
      symptoms: [],
      fileclosed: false,
      suggtreats: [],
      summary: [],
      measures: [],
      preventive_measures: [],
      doctornotes: null,
      Medications: null
    });
    await newReport.save();

    console.log("PDF uploaded and saved successfully");

    // Read PDF buffer and parse text
    const matter = await pdfParse(pdfBuffer);
    const {
      GoogleGenerativeAI,
      HarmCategory,
      HarmBlockThreshold,
    } = require("@google/generative-ai");


    const genAI = new GoogleGenerativeAI("AIzaSyBCrBhLm4UM0Gj5V8LwQlXJyks9TyE3FG8"); // Replace API_KEY with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const generationConfig = {
      temperature: 0,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const parts = [{
      text: "\nthe patient will give the laboratory test report in the pdf parser text . if the report does not contain any health parameter values or specific medical information that would allow for a diagnosis must give a response as \"invalid health report\" and don't print anything. if it has medical information you should analyze the data,health parameters and values and predict any disease that the user have and give him/her suggestion to improve health based on the report. .don't give any health parameter values.if the patient have any serious condition mention them in the first .the format of the response should be contain 3 paragraphs the first paragraph describes about  the  disease they have and second paragraph should be about risk of diseases they may face in future and the third paragraph should be suggestions and tips to improve their health based on the health report. the health suggestions should be precise. give the headings to the three paragraphs. \n\. the parsed pdf: " + matter.text,}];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    console.log(response.text());
    res.status(200).json({ message: response.text(), pdfid: newPdf._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})
app.use('/en',approute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,'./build', 'index.html'));
});


