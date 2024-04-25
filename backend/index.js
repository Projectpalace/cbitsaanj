const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const approute=require('./routes')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URL
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.use(express.static(path.join(__dirname,'./build ')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'./build', 'index.html'));;
});
app.use('/en',approute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,'./build', 'index.html'));
});


