const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const approute=require('./routes')
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();
const {Voice} = require('./models');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save voice recording' });
  }
});
app.use('/en',approute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,'./build', 'index.html'));
});


