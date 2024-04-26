const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const app = express();
const pdfParse = require('pdf-parse');
app.use(express.json());
const {report,PdfModel}=require('../models')
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const { ObjectId } = require('mongodb');
const PDFDocument = require('pdfkit');
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb://user_42bch7t68:p42bch7t68@ocdb.app:5050/db_42bch7t68?retryWrites=true&w=majority');
const db = mongoose.connection;

// Check connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', err => {
  console.error(err);
});

const pdfSchema = new mongoose.Schema({
  name: String,
  content: Buffer
});


// Create a model based on the schema

const reportSchema = new mongoose.Schema({
  patient: ObjectId,
  doctor: ObjectId,
  File: ObjectId,
  dateopen: Date,
  symptoms: Array,
  fileclosed: Boolean,
  suggtreats: Array,
  summary: Array,
  measures: Array,
  preventive_measures: Array,
  doctornotes: Array,
  Medications: Array
});

const ReportModel = mongoose.model('Report', reportSchema);

const uploadFile = async (req, res) => {
  try {
    console.log("hello");
    const pdf=req.file;
    console.log(pdf);
    const pdfBuffer = pdf.buffer; // Access the file buffer directly

    const newPdf = new PdfModel({
      name: req.file.originalname,
      content: pdfBuffer
    });
    await newPdf.save();
    

    const newReport = new ReportModel({
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
};

// Express route to handle PDF generation
const genpdf = async (req, res) => {
  console.log('loll')
  try {
    const objectId = req.query.objectId;
    // Find the PDF file URL based on the objectId in the database
    const pdfFile = await PdfModel.findOne({ objectId });
    if (!pdfFile) {
        return res.status(404).json({ error: 'PDF file not found' });
    }
    // Return the PDF file URL
    res.json({ url: pdfFile.url });
} catch (error) {
    console.error('Error fetching PDF URL:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

const formatFile= (req, res) => {
  const matter=req.body.message;
  const pdfid=req.body.pdfid;
  console.log(pdfid);
  let jsonied={}
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const MODEL_NAME = "gemini-1.0-pro";
    const API_KEY = "AIzaSyBCrBhLm4UM0Gj5V8LwQlXJyks9TyE3FG8";

  async function runChat() {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
      const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
      };
    
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
    
      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [{ text: "\"**Current Health Conditions:**\\n\\nBased on the provided laboratory test report, you have elevated levels of glycosylated hemoglobin (HbA1c) at 8.3%, which indicates poorly controlled diabetes. This condition can lead to serious complications if not managed properly.\\n\\n**Risk of Future Diseases:**\\n\\nUncontrolled diabetes can increase your risk of developing various health complications, including:\\n\\n* Heart disease\\n* Stroke\\n* Kidney disease\\n* Eye damage (retinopathy)\\n* Nerve damage (neuropathy)\\n\\n**Health Suggestions and Tips:**\\n\\nTo improve your health and manage your diabetes, it is crucial to:\\n\\n* **Follow a healthy diet:** Focus on consuming fruits, vegetables, whole grains, and lean protein. Limit processed foods, sugary drinks, and unhealthy fats.\\n* **Exercise regularly:** Aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week.\\n* **Monitor your blood sugar levels:** Check your blood sugar levels regularly as directed by your doctor.\\n* **Take prescribed medications:** If prescribed, take your diabetes medications as directed.\\n* **Quit smoking:** Smoking can worsen diabetes complications.\\n* **Get regular checkups:** Visit your doctor regularly for comprehensive checkups and to discuss your diabetes management plan.\""}],
          },
          {
            role: "model",
            parts: [{ text: "```json\n{\n    \"potentialhealthrisks\": [\n        \"Heart disease\",\n        \"Stroke\",\n        \"Kidney disease\",\n        \"Eye damage (retinopathy)\",\n        \"Nerve damage (neuropathy)\"\n    ],\n    \"healthimprovsuggestions\":[\n        \"Follow a healthy diet: Focus on consuming fruits, vegetables, whole grains, and lean protein. Limit processed foods, sugary drinks, and unhealthy fats.\",\n        \"Exercise regularly: Aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week.\",\n        \"Monitor your blood sugar levels: Check your blood sugar levels regularly as directed by your doctor.\",\n        \"Take prescribed medications: If prescribed, take your diabetes medications as directed.\",\n        \"Quit smoking: Smoking can worsen diabetes complications.\", \n        \"Get regular checkups: Visit your doctor regularly for comprehensive checkups and to discuss your diabetes management plan.\"\n ],\n 'disease risk prediction':[list of diseases] } "}],
          },
        ],
      });
      const result = await chat.sendMessage("user will give you some information regarding his health condition like Current Health conditions,Risk of Future Diseases,health suggestions .you should understand and give response as the format which convert into json object using json.loads and format is : ```json\n{\n    \"potentialhealthrisks\": [\n        \"Heart disease\",\n        \"Stroke\",\n        \"Kidney disease\",\n        \"Eye damage (retinopathy)\",\n        \"Nerve damage (neuropathy)\"\n    ],\n    \"healthimprovsuggestions\":[\n        \"Follow a healthy diet: Focus on consuming fruits, vegetables, whole grains, and lean protein. Limit processed foods, sugary drinks, and unhealthy fats.\",\n        \"Exercise regularly: Aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week.\",\n        \"Monitor your blood sugar levels: Check your blood sugar levels regularly as directed by your doctor.\",\n        \"Take prescribed medications: If prescribed, take your diabetes medications as directed.\",\n        \"Quit smoking: Smoking can worsen diabetes complications.\", \n        \"Get regular checkups: Visit your doctor regularly for comprehensive checkups and to discuss your diabetes management plan.\"\n    ],\n    \"immediatetreatments\": [],\n    \"preventivemeasures\": [\n        \"Follow a healthy diet\",\n        \"Exercise regularly\",\n        \"Monitor blood sugar levels\",\n        \"Take prescribed medications\",\n        \"Quit smoking\",\n        \"Get regular checkups\"\n    ]\n}\n``` the health information is "+matter);
      const response = result.response;
      let jsonstring=response.text();
      jsonstring=jsonstring.slice(3,-3);
      if (jsonstring.startsWith("json")) {
        jsonstring = jsonstring.slice(4);
    }
    let jsonObject = JSON.parse(jsonstring.trim());
    console.log(jsonObject);
    jsonied=jsonObject;


      res.send({ message: jsonObject ,pdfid:pdfid});
    }
    runChat().then(async() => {
      const doc = await report.findOne({File: pdfid});
      doc.suggtreats=jsonied.immediatetreatments;
      doc.summary=jsonied.potentialhealthrisks;
      doc.measures=jsonied.preventivemeasures;
      doc.improveSuggestions=jsonied.healthimprovsuggestions;
      doc.save();
      console.log(doc);
    })
    .catch(err => console.log("Error generating response:", err));
    


};

const getTxt = async (req, res) => {
  console.log("hello")
  const doc = await report.findOne({_id: "662bf6f1ddcc57968a4cb6fb"});
  console.log(doc);
  res.send({
    suggestedtreatments: doc.suggtreats,
    potentialhealthrisks: doc.summary,
    preventivemeasures: doc.measures,
    preventivemeasures_new: doc.preventive_measures
  });
  console.log(doc);
};


module.exports={
    uploadFile,
    formatFile,
    genpdf,
    getTxt
}
