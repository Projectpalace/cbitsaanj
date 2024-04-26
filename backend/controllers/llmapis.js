const express=require('express')
const multer=require('multer')
const fs = require('fs');
const pdfParse = require('pdf-parse');const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
let matter="";

const app=express();
app.use(express.json());

const upload=multer({dest:'uploads/'})


const uploadFile=(req, res) =>{
  const upload = multer({dest:'uploads/'}).single('pdf');
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const pdfBuffer = fs.readFileSync(req.file.path);
    let matter = "";
    pdfParse(pdfBuffer).then(async data => {
      matter = data.text;

      const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
      } = require("@google/generative-ai");

      const MODEL_NAME = "gemini-1.0-pro";
      const API_KEY = "AIzaSyBCrBhLm4UM0Gj5V8LwQlXJyks9TyE3FG8";

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
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

      const parts = [
        {
          text:
            "\nthe patient will give the laboratory test report in the pdf parser text . if the report does not contain any health parameter values or specific medical information that would allow for a diagnosis must give a response as \"invalid health report\" and don't print anything. if it has medical information you should analyze the data,health parameters and values and predict any disease that the user have and give him/her suggestion to improve health based on the report. .don't give any health parameter values.if the patient have any serious condition mention them in the first .the format of the response should be contain 3 paragraphs the first paragraph describes about  the  disease they have and second paragraph should be about risk of diseases they may face in future and the third paragraph should be suggestions and tips to improve their health based on the health report. the health suggestions should be precise. give the headings to the three paragraphs. \n\. the parsed pdf: " +
            matter,
        },
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      res.send({ message: response.text() });
    });
  });
}

const formatFile= (req, res) => {
  const matter=req.body.message;
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
            parts: [{ text: "```json\n{\n    \"potentialhealthrisks\": [\n        \"Heart disease\",\n        \"Stroke\",\n        \"Kidney disease\",\n        \"Eye damage (retinopathy)\",\n        \"Nerve damage (neuropathy)\"\n    ],\n    \"healthimprovsuggestions\":[\n        \"Follow a healthy diet: Focus on consuming fruits, vegetables, whole grains, and lean protein. Limit processed foods, sugary drinks, and unhealthy fats.\",\n        \"Exercise regularly: Aim for at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week.\",\n        \"Monitor your blood sugar levels: Check your blood sugar levels regularly as directed by your doctor.\",\n        \"Take prescribed medications: If prescribed, take your diabetes medications as directed.\",\n        \"Quit smoking: Smoking can worsen diabetes complications.\", \n        \"Get regular checkups: Visit your doctor regularly for comprehensive checkups and to discuss your diabetes management plan.\"\n    ],\n    \"immediatetreatments\": [],\n    \"preventivemeasures\": [\n        \"Follow a healthy diet\",\n        \"Exercise regularly\",\n        \"Monitor blood sugar levels\",\n        \"Take prescribed medications\",\n        \"Quit smoking\",\n        \"Get regular checkups\"\n    ]\n}\n```"}],
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


      res.send({ message: jsonObject });
    }
    runChat();

};

module.exports={
    uploadFile,
    formatFile
}