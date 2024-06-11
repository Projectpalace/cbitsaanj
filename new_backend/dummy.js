/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

/*const analyze = async () => {
  try {

  }
  catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve reports' });
  }
}*/

const fs = require('fs');
const pdf = require('pdf-parse');

/*const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = "AIzaSyCqX6XEJ9k1mGC0Q_BP_WblLxSomZrwPPE";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 0,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "the user will give you the parsed test report  and you should give response as health parameter and it's value as key value pair in a object and also fetch date and include in the output at first position."},
            {text: "Vijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   SerumRef no.:\nURIC ACID\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nUric Acid\n2.6 - 6.0  mg/dL4.0\n:\nMethod : Uricase Peroxidase\nComments / Interpretation :\n----------------------------------\n- Useful for monitoring therapeutic management of gout and chemotherapeutic treatment of neoplasms.\nUREA\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nUrea\nAdult       : 17  -  43 mg/dL\nNewborn : 8.4 - 25.8 mg/dL\nChildren   : 10.8 - 38.4 mg/dL\nInfant      : 10.8 - 38.4 mg/dL\n16\n:\nMethod : Urease / GLDH\nComments / Interpretation :\n---------------------------------\n- In conjunction with serum creatinine, urea level aids in differential diagnosis of Pre-Renal, Renal and Post-Renal hyperuremia.\nCREATININE\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nCreatinine\nAdult Female : 0.6 - 1.0 mg/dL\nNeonate         : 0.3 - 1.0 mg/dL\nInfant             : 0.2 - 0.4 mg/dL\nChildren         : 0.3 - 0.8 mg/dL\n0.5\n:\nMethod : Jaffe Kinetic IDMS\nComments / Interpretation :\n-------------------------------\n- Useful in the diagnosis renal insufficiency and is more specific and sensitive indicator of renal disease than of BUN.\n- Use of simultaneously BUN and creatinine levels provide more information in the diagnosis of renal insufficiency.\nELECTROLYTES\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nSodium\n136 - 146  mmol/L138\n:\nMethod : ISE INDIRECT\nPotassium\n3.5 - 5.1  mmol/L5.0\n:\nMethod : ISE INDIRECT\nChlorides\n101 - 109  mmol/L101\n:\nMethod : ISE INDIRECT\n*141922478*\nReleased Date \n:\n24/03/2019  11:26\nPage 1 of 7\n\nVijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   SerumRef no.:\nComments / Interpretation :\n---------------------------------\nSodium :-\n- Useful in the diagnosis and treatment of dehydration, overhydration. Hypernatremia suggests dehydration and Hyponatremia\n  (<130 mmol/L) suggests overhydration.\n- Levels of sodium when evaluated with electrolytes aid in assessing acid base balance, water balance and water intoxication.\nPotassium :-\n- Useful in evaluation of electrolyte balance, cardiac arrhythmia, muscular weakness, hepatic encephalopathy and renal failure.\nChloride :-\n- Useful, when assayed along with Sodium, Potassium and bicarbonate in assessment of electrolyte, acid base and water \n  balance.\nDR S G ALI HATIM\nCONSULTANT BIOCHEMIST\n*141922478*\nReleased Date \n:\n24/03/2019  11:26\nPage 2 of 7\n\nVijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   Fluoride PlasmaRef no.:\nFASTING PLASMA GLUCOSE (FPG)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nFasting Plasma Glucose\nNormal : 70-100 mg/dL\nImpaired Fasting Glucose : 101-125 mg/dL\nDiabetes : >/=126  mg/dL\n:201\nMethod : Hexokinase\nComments / Interpretation :\n---------------------------------\n- ADA Guidelines (2018) are adopted for the evaluation of Diabetic Status.\nPOST LUNCH PLASMA GLUCOSE (PLPG)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\n2 hrs Post Lunch Plasma Glucose\nNormal : 100-140 mg/dL\nImpaired Glucose Tolerance : 141-199 mg/dL\nDiabetes : >/=200  mg/dL\n:212\nMethod : Hexokinase\nComments / Interpretation :\n---------------------------------\n- ADA Guidelines (2018) are adopted for the evaluation of Diabetic Status.\nDR S G ALI HATIM\nCONSULTANT BIOCHEMIST\nCertificate # MC-2657\nNABL Accredited\n*141922478*\nReleased Date \n:\n24/03/2019  16:09\nPage 3 of 7\n\nVijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   Whole Blood - EDTARef no.:\nCOMPLETE BLOOD PICTURE (CBP)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nHaemoglobin\n12.0 - 15.0  g/dL\n:11.2\nPhotometric measurement\nTotal RBC Count\n3.8 - 4.8  millions/cumm4.38\n:\nCoulter Principle\nPacked Cell Volume / Hematocrit\n36.0 - 46.0  Vol%\n:34.2\nCalculated\nMCV\n83.0 - 101.0  fl\n:78.1\nDerived from RBC Histogram\nMCH\n27 - 32  pg\n:25.7\nCalculated\nMCHC\n31.5 - 34.5  gm/dL32.9\n:\nCalculated\nRDW\n11.6 - 14.0  %\n:16.8\nDerived from RBC Histogram\nTotal WBC Count\n4000 - 10000  Cells/cumm6400\n:\nCoulter Principle\nDifferential count\nNeutrophils\n40 - 80  %60\n:\nVCSn Technology &  Microscopy\nLymphocytes\n20 - 40  %28\n:\nVCSn Technology &  Microscopy\nEosinophils\n1 - 6  %2\n:\nVCSn Technology &  Microscopy\nMonocytes\n2 - 10  %9\n:\nVCSn Technology &  Microscopy\nBasophils\n0 - 2  %1\n:\nVCSn Technology &  Microscopy\nAbsolute Leucocyte Count\nAbsolute Neutrophil Count\n2000 - 7000  Cells/cumm3900\n:\nMethod : Calculation\nAbsolute Lymphocyte Count\n1000 - 3000  Cells/cumm1800\n:\nMethod : Calculation\nAbsolute Eosinophil Count\n20 - 500  Cells/cumm100\n:\nMethod : Calculation\nAbsolute Monocyte Count\n200 - 1000  Cells/cumm600\n:\nMethod : Calculation\nNABL Accredited\n*141922478*\nReleased Date \n:\n24/03/2019  12:09\nPage 4 of 7\n\nVijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   Whole Blood - EDTARef no.:\nCOMPLETE BLOOD PICTURE (CBP)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nPlatelet Count\n150000 - 410000  /cumm\n:427000\nCoulter Principle\nPeripheral Smear\nRBC\nNormocytic Normochromic with mild anisocytosis\n:\nMicroscopy : Leishman stain/Modified Giemsa Stain\nWBC\nNormal in morphology,maturity and distribution\n:\nMicroscopy : Leishman stain/Modified Giemsa Stain\nPlatelets\nAdequate\n:\nMicroscopy : Leishman stain/Modified Giemsa Stain\nDR.DILIP KUMAR DAS\nCONSULTANT PATHOLOGIST\nCertificate # MC-2657\nNABL Accredited\n*141922478*\nReleased Date \n:\n24/03/2019  12:09\nPage 5 of 7\n\nVijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   UrineRef no.:\nCOMPLETE URINE EXAMINATION (CUE)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nMacroscopic Examination\nColour\nPale YellowPale Yellow\n:\nAppearance\nClearClear\n:\nSpecific Gravity\n1.003 - 1.0301.010\n:\nIon Exchange\nReaction/pH\n4.6 - 8Alkaline (7.5)\n:\nDouble Indicator\nProtein\nNil - TraceNil\n:\nProtein error of Indicator\nGlucose\nNilNil\n:\nGOD-POD\nUrobilinogen\nNANormal\n:\nModified Ehrlich reaction\nBilirubin\nNegativeNegative\n:\nDiazonium method\nKetones\nNegativeNegative\n:\nNitroprusside reaction\nNitrites\nNegativeNegative\n:\nDiazonium method\nMicroscopic Examination\nPus Cells\n0 - 5  Cells / HPF1-2/HPF\n:\nR.B.C\n0 - 2  Cells / HPFNil\n:\nEpithelial Cells\n0 - 5  Cells / HPF1-2/HPF\n:\nCasts\nNil/LPFNil\n:\nCrystals\nNilNil\n:\nMethod\nReagent Strip Method, Microscopy.\n:\nDR.ASIMA MUBEEN QUADRI\nCONSULTANT PATHOLOGIST\nCertificate # MC-2657\nNABL Accredited\n*141922478*\nReleased Date \n:\n25/03/2019  15:20\nPage 6 of 7\n\nVijaya Diagnostic Centre\n3-6-16 & 17, Street No. 19, Basheerbagh, Hyderabad - 500 029\nLABORATORY TEST REPORT \n07:16:   3/24/2019Regn DateSample Collection:   24/03/2019   07:24\n:Print DateName15:2725/03/2019:\nMRS. G V RAMANI\n:Regn No/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn CentreAmeerpetRef  By:   Dr. RAGHU K\nSample Type :   SerumRef no.:\nLIPID PROFILE (LP)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nSerum Status\nClear\n:\nTriglycerides\nDesirable Level : < 150 mg/dL\nBorderline         : 150 - 199 mg/dL\nHigh                  : 200 - 499 mg/dL\nVery High         : > 499 mg/dL\n212\n:\nMethod : GPO-POD\nTotal Cholesterol\nDesirable Level : < 200 mg/dL\nBorderline         : 200 - 239 mg/dL\nUndesirable       : > 239 mg/dL\n161\n:\nMethod : CHOD-POD\nLDL Cholesterol.\nOptimal             : < 100 mg/dL\nNear Optimal    : 100 - 129 mg/dL\nBorderline High : 130 - 159 mg/dL\nHigh                   : 160 - 189 mg/dL\nVery High           : > 189 mg/dL\n83\n:\nMethod: Calculation\nHDL Cholesterol\nDesirable Level : > 59 mg/dL\nOptimal            : 40 - 59 mg/dL\nUndesirable      : < 40 mg/dL\n36\n:\nMethod : Enzymatic Immunoinhibition\nVLDL\n< 30  mg/dL42\n:\nMethod: Calculation\nTotal Cholesterol/HDL Cholesterol Ratio\nLow Risk         : 3.3 - 4.4\nAverage Risk    : 4.5 - 7.1\nModerate Risk : 7.2 - 11.0\n4.47\n:\nMethod: Calculation\nLDL Cholesterol/HDL Cholesterol Ratio\nDesirable Level : 0.5 - 3.0\nBorderline Risk : 3.0 - 6.0\nHigh Risk          : > 6.0\n2.29\n:\nMethod: Calculation\nComments / Interpretation :\n---------------------------------\n- Lipid profile is a panel of blood tests that serves as an initial broad medical screening tool for abnormalities in lipids, the\n  results of this tests can identify certain genetic diseases and can determine approximate risks for cardiovascular disease,\n  certain forms of pancreatitis and other diseases.\nDR S G ALI HATIM\nCONSULTANT BIOCHEMIST\nCertificate # MC-2657\nNABL Accredited\n*141922478*\nReleased Date \n:\n24/03/2019  12:21\nPage 7 of 7\n\nLABORATORY TEST REPORT \n07:16\n:\n24/03/2019Regn DateSample Collection\n:\n24/03/2019   07:24\n:\nPrint DateName15:2725/03/2019\n:\nMRS. G V RAMANI\n:\nRegn No\n/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn Centre\nAmeerpetRef  By\n:\nDr. RAGHU K\nSample Type :\nWhole Blood - EDTA\nRef no.:\nGLYCOSYLATED HAEMOGLOBIN (HbA1c)\nTEST NAMERESULTBIOLOGICAL REFERENCE INTERVAL\nGlycosylated Haemoglobin\nNon Diabetic : < 5.6% \nPrediabetic Range : 5.7 - 6.4%\nDiabetic Range : > 6.5%\n8.3\n:\nMethod : High Performance Liquid Chromatography (HPLC)\nComments / Interpretation :\n---------------------------------\n- Glycosylated hemoglobin is proportional to mean plasma glucose level during previous 6-12 weeks.\n- Values may not be comparable with different methodologies and even different laboratories using the same methodology.\n- Perform A1c at least twice annually in Diabetes patients to ascertain meeting of goals\n- Perform A1c test quarterly in Diabetes patients whose therapy has changed and who are not meeting goals\n- Recommended goal of A1c is < 7%\n- ADA Guidelines 2016.\n*141922478*\nReleased Date :\n24/03/2019  11:41\nPage 1 of 2\n\nLABORATORY TEST REPORT \n07:16\n:\n24/03/2019Regn DateSample Collection\n:\n24/03/2019   07:24\n:\nPrint DateName15:2725/03/2019\n:\nMRS. G V RAMANI\n:\nRegn No\n/:\n141922478\nAge / Sex\nFemale54 Years\n:Regn Centre\nAmeerpetRef  By\n:\nDr. RAGHU K\nSample Type :\nWhole Blood - EDTA\nRef no.:\nDR S G ALI HATIM\nCONSULTANT BIOCHEMIST\nCertificate # MC-2657\n*141922478*\nReleased Date :\n24/03/2019  11:41\nPage 2 of 2\n\nBio-Rad CDM SystemPATIENT REPORT\nCDM 5.1 VII TURBO InstrumentV2TURBO_A1c_2.0\nPatient DataAnalysis Data \nSample ID: 141922478Analysis Performed: 24/03/2019 10:56:16\nPatient ID: Injection Number: 13713\nName: Run Number: 692\nPhysician:Rack ID:\nSex: Tube Number:9\nDOB: Report Generated:24/03/2019 11:01:12\nOperator ID:\nComments:\nNGSPRetentionPeak\nPeak Name%Area %Time (min)Area\nA1a--- 1.5 0.16315349\nA1b--- 2.5 0.23324922\nLA1c--- 2.3 0.38523384\nA1c8.3*--- 0.48569821\nP3--- 4.0 0.76439918\nP4--- 1.5 0.85215086\nAo--- 81.1 1.000807659\n*Values outside of expected ranges\nTotal Area:996,138*\nHbA1c (NGSP) = 8.3* % \n0.000.250.500.751.001.251.50\n0.0\n2.5\n5.0\n7.5\n10.0\n12.5\n15.0\n17.5\n20.0\nTime (min.)\n%A1c\n - \n0.16\n - \n0.23\n - \n0.39\nA1c  - \n0.49\n - \n0.76\n - \n0.85\n - \n1.00"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"date\": \"24/03/2019\",\n  \"Uric Acid\": \"4.0 mg/dL\",\n  \"Urea\": \"16 mg/dL\",\n  \"Creatinine\": \"0.5 mg/dL\",\n  \"Sodium\": \"138 mmol/L\",\n  \"Potassium\": \"5.0 mmol/L\",\n  \"Chlorides\": \"101 mmol/L\",\n  \"Fasting Plasma Glucose\": \"201 mg/dL\",\n  \"2 hrs Post Lunch Plasma Glucose\": \"212 mg/dL\",\n  \"Haemoglobin\": \"11.2 g/dL\",\n  \"Total RBC Count\": \"4.38 millions/cumm\",\n  \"Packed Cell Volume / Hematocrit\": \"34.2 Vol%\",\n  \"MCV\": \"78.1 fl\",\n  \"MCH\": \"25.7 pg\",\n  \"MCHC\": \"32.9 gm/dL\",\n  \"RDW\": \"16.8 %\",\n  \"Total WBC Count\": \"6400 Cells/cumm\",\n  \"Neutrophils\": \"60 %\",\n  \"Lymphocytes\": \"28 %\",\n  \"Eosinophils\": \"2 %\",\n  \"Monocytes\": \"9 %\",\n  \"Basophils\": \"1 %\",\n  \"Absolute Neutrophil Count\": \"3900 Cells/cumm\",\n  \"Absolute Lymphocyte Count\": \"1800 Cells/cumm\",\n  \"Absolute Eosinophil Count\": \"100 Cells/cumm\",\n  \"Absolute Monocyte Count\": \"600 Cells/cumm\",\n  \"Platelet Count\": \"427000 /cumm\",\n  \"RBC\": \"Normocytic Normochromic with mild anisocytosis\",\n  \"WBC\": \"Normal in morphology,maturity and distribution\",\n  \"Platelets\": \"Adequate\",\n  \"Colour\": \"Pale Yellow\",\n  \"Appearance\": \"Clear\",\n  \"Specific Gravity\": \"1.010\",\n  \"Reaction/pH\": \"Alkaline (7.5)\",\n  \"Protein\": \"Nil\",\n  \"Glucose\": \"Nil\",\n  \"Urobilinogen\": \"Normal\",\n  \"Bilirubin\": \"Negative\",\n  \"Ketones\": \"Negative\",\n  \"Nitrites\": \"Negative\",\n  \"Pus Cells\": \"1-2/HPF\",\n  \"R.B.C\": \"Nil\",\n  \"Epithelial Cells\": \"1-2/HPF\",\n  \"Casts\": \"Nil\",\n  \"Crystals\": \"Nil\",\n  \"Serum Status\": \"Clear\",\n  \"Triglycerides\": \"212 mg/dL\",\n  \"Total Cholesterol\": \"161 mg/dL\",\n  \"LDL Cholesterol\": \"83 mg/dL\",\n  \"HDL Cholesterol\": \"36 mg/dL\",\n  \"VLDL\": \"42 mg/dL\",\n  \"Total Cholesterol/HDL Cholesterol Ratio\": \"4.47\",\n  \"LDL Cholesterol/HDL Cholesterol Ratio\": \"2.29\",\n  \"Glycosylated Haemoglobin\": \"8.3 %\"\n}\n```"},
          ],
        },
      ],
    });

    const dataBuffer = fs.readFileSync('./str.pdf');
    const data = await pdf(dataBuffer);
  
    const result = await chatSession.sendMessage(data.text);
    let matter=result.response.text();
    matter = matter.replace('json', '').replace('```', '').replace("```","").replace('\n',"");
     const jsonObject = JSON.parse(matter);   
  }
  
  run();*/




///new 

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */



const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyBhLEKrevEbmMs1DwguA6alZqHX2MJGx6U";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "you are a medical reports analyzer which analyze the reports and give output in a specific format where the  Keys are summary of analysis, Date of report , Precautions, Possible disease risks, severity rating out of 10, which specialist(one or less) is needed. the format of output should be in:  Short-Analysis:String,Precautions:Array,Possible-disease risks:Array,Severity:int,specialist:String as json format\n",
});

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "{\n  \"date\": \"24/03/2019\",\n  \"Uric Acid\": \"4.0 mg/dL\",\n  \"Urea\": \"16 mg/dL\",\n  \"Creatinine\": \"0.5 mg/dL\",\n  \"Sodium\": \"138 mmol/L\",\n  \"Potassium\": \"5.0 mmol/L\",\n  \"Chlorides\": \"101 mmol/L\",\n  \"Fasting Plasma Glucose\": \"201 mg/dL\",\n  \"2 hrs Post Lunch Plasma Glucose\": \"212 mg/dL\",\n  \"Haemoglobin\": \"11.2 g/dL\",\n  \"Total RBC Count\": \"4.38 millions/cumm\",\n  \"Packed Cell Volume / Hematocrit\": \"34.2 Vol%\",\n  \"MCV\": \"78.1 fl\",\n  \"MCH\": \"25.7 pg\",\n  \"MCHC\": \"32.9 gm/dL\",\n  \"RDW\": \"16.8 %\",\n  \"Total WBC Count\": \"6400 Cells/cumm\",\n  \"Neutrophils\": \"60 %\",\n  \"Lymphocytes\": \"28 %\",\n  \"Eosinophils\": \"2 %\",\n  \"Monocytes\": \"9 %\",\n  \"Basophils\": \"1 %\",\n  \"Absolute Neutrophil Count\": \"3900 Cells/cumm\",\n  \"Absolute Lymphocyte Count\": \"1800 Cells/cumm\",\n  \"Absolute Eosinophil Count\": \"100 Cells/cumm\",\n  \"Absolute Monocyte Count\": \"600 Cells/cumm\",\n  \"Platelet Count\": \"427000 /cumm\",\n  \"RBC\": \"Normocytic Normochromic with mild anisocytosis\",\n  \"WBC\": \"Normal in morphology,maturity and distribution\",\n  \"Platelets\": \"Adequate\",\n  \"Colour\": \"Pale Yellow\",\n  \"Appearance\": \"Clear\",\n  \"Specific Gravity\": \"1.010\",\n  \"Reaction/pH\": \"Alkaline (7.5)\",\n  \"Protein\": \"Nil\",\n  \"Glucose\": \"Nil\",\n  \"Urobilinogen\": \"Normal\",\n  \"Bilirubin\": \"Negative\",\n  \"Ketones\": \"Negative\",\n  \"Nitrites\": \"Negative\",\n  \"Pus Cells\": \"1-2/HPF\",\n  \"R.B.C\": \"Nil\",\n  \"Epithelial Cells\": \"1-2/HPF\",\n  \"Casts\": \"Nil\",\n  \"Crystals\": \"Nil\",\n  \"Serum Status\": \"Clear\",\n  \"Triglycerides\": \"212 mg/dL\",\n  \"Total Cholesterol\": \"161 mg/dL\",\n  \"LDL Cholesterol\": \"83 mg/dL\",\n  \"HDL Cholesterol\": \"36 mg/dL\",\n  \"VLDL\": \"42 mg/dL\",\n  \"Total Cholesterol/HDL Cholesterol Ratio\": \"4.47\",\n  \"LDL Cholesterol/HDL Cholesterol Ratio\": \"2.29\",\n  \"Glycosylated Haemoglobin\": \"8.3 %\"\n}\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"Short-Analysis\": \"The report indicates borderline high fasting and post-lunch blood sugar levels, suggesting prediabetes or diabetes. Elevated HbA1c further supports this. Lipid profile shows slightly elevated triglycerides and LDL cholesterol, increasing cardiovascular risk. Mild urinary tract infection is also observed.\",\n  \"Date of report\": \"24/03/2019\",\n  \"Precautions\": [\n    \"Follow a balanced diet low in carbohydrates and sugars.\",\n    \"Engage in regular physical activity.\",\n    \"Maintain healthy weight.\",\n    \"Drink plenty of water.\",\n    \"Monitor blood sugar levels regularly.\"\n  ],\n  \"Possible-disease risks\": [\n    \"Prediabetes\",\n    \"Type 2 Diabetes\",\n    \"Dyslipidemia\",\n    \"Cardiovascular disease\",\n    \"Urinary Tract Infection\"\n  ],\n  \"Severity\": 6,\n  \"specialist\": \"Endocrinologist\"\n}\n```\n"},
        ],
      },
    ],
  });

  let values={
    "date": '24/03/2019',
    'Uric Acid': '4.0 mg/dL',
    "Urea": '16 mg/dL',
    "Creatinine": '0.5 mg/dL',
    "Sodium": '138 mmol/L',
    "Potassium": '5.0 mmol/L',
    "Chlorides": '101 mmol/L',
    'Fasting Plasma Glucose': '201 mg/dL',
    '2 hrs Post Lunch Plasma Glucose': '212 mg/dL',
    "Haemoglobin": '11.2 g/dL',
    'Total RBC Count': '4.38 millions/cumm',
    'Packed Cell Volume / Hematocrit': '34.2 Vol%',
    "MCV": '78.1 fl',
    "MCH": '25.7 pg',
    "MCHC": '32.9 gm/dL',
    "RDW": '16.8 %',
    'Total WBC Count': '6400 Cells/cumm',
    'Neutrophils': '60 %',
    'Lymphocytes': '28 %',
    'Eosinophils': '2 %',
    'Monocytes': '9 %',
    'Basophils': '1 %',
    'Absolute Neutrophil Count': '3900 Cells/cumm',
    'Absolute Lymphocyte Count': '1800 Cells/cumm',
    'Absolute Eosinophil Count': '100 Cells/cumm',
    'Absolute Monocyte Count': '600 Cells/cumm',
    'Platelet Count': '427000 /cumm',
    'RBC': 'Normocytic Normochromic with mild anisocytosis',
    'WBC': 'Normal in morphology,maturity and distribution',
    'Platelets': 'Adequate',
    'Colour': 'Pale Yellow',
    'Appearance': 'Clear',
    'Specific Gravity': '1.010',
    'Reaction/pH': 'Alkaline (7.5)',
    'Protein': 'Nil',
    'Glucose': 'Nil',
    'Urobilinogen': 'Normal',
    'Bilirubin': 'Negative',
    'Ketones': 'Negative',
    'Nitrites': 'Negative',
    'Pus Cells': '1-2/HPF',
    'R.B.C': 'Nil',
    'Epithelial Cells': '1-2/HPF',
    'Casts': 'Nil',
    'Crystals': 'Nil',
    'Serum Status': 'Clear',
    'Triglycerides': '212 mg/dL',
    'Total Cholesterol': '161 mg/dL',
    'LDL Cholesterol': '83 mg/dL',
    'HDL Cholesterol': '36 mg/dL',
    'VLDL': '42 mg/dL',
    'Total Cholesterol/HDL Cholesterol Ratio': '4.47',
    'LDL Cholesterol/HDL Cholesterol Ratio': '2.29',
    'Glycosylated Haemoglobin': '8.3 %'
  }

  const valuej=JSON.stringify(values);

  const result = await chatSession.sendMessage(valuej);
  let analysis=result.response.text();
  analysis = analysis.replace('json', '').replace('```', '').replace("```","").replace('\n',"");
  const analysisjson = JSON.parse(analysis);

  console.log(analysisjson);
}

run();
