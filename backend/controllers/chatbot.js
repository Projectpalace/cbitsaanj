// const express=require('express')
// const app=express();
// app.use(express.json());
// const googleTTS = require('google-tts-api');

// const chatbot=(req,res)=>{
//     const missage=req.body.missage;
//     const {
//         GoogleGenerativeAI,
//         HarmCategory,
//         HarmBlockThreshold,
//       } = require("@google/generative-ai");
      
//       const MODEL_NAME = "gemini-1.5-pro-latest";
//       const API_KEY = "AIzaSyBCrBhLm4UM0Gj5V8LwQlXJyks9TyE3FG8";
//       let responsee='';
//       async function runChat() {
//         const genAI = new GoogleGenerativeAI(API_KEY);
//         const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
//         const generationConfig = {
//           temperature: 1,
//           topK: 0,
//           topP: 0.95,
//           maxOutputTokens: 8192,
//         };
      
//         const safetySettings = [
//           {
//             category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//           },
//           {
//             category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//           },
//           {
//             category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//           },
//           {
//             category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//             threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//           },
//         ];
      
//         const chat = model.startChat({
//           generationConfig,
//           safetySettings,
//           history: [{
//             "role": "user",
//             "parts": [{text : "You are a medical chatbot Chintu. your response should be short and one sentence.Introduce yourself when you are greeted. you shouldnt answer anything else other than medical related queries. ask one question at a time whenever you need to. priortise gathering more information and giving a higher accuracy response. if you are suggesting a appointment with doctor mention speciality if needed"}]
//           },
//           {
//             "role": "model",
//             "parts": [{text:"Hi, I'm Chintu, your friendly medical chatbot. How can I help you today?"}]
//           }],
//         });
      
//         const result = await chat.sendMessage(missage);
//         const response = result.response;
//         if (response) {
//         const responseText = response.text();
//         responsee=responseText
//         const url = await googleTTS.getAudioUrl(responseText, {
//             lang: 'en',
//             slow: false,
//             host: 'https://translate.google.com', 
//           })
//         res.json({url})
//         } else {
//           res.status(500).send('Error: Response is undefined')
//         }
//       }
      
//       runChat().catch((err) => {
//         console.error('Error:', err);
//         res.status(500).send(err)
//       });
// }

// module.exports={
//     chatbot
// }


