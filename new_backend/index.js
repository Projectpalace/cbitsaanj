const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const approute = require('./route');
require('dotenv').config();

const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URL;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use(express.static(path.join(__dirname, './build')));

app.get('/', cors(), (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});


app.use('/en', approute);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
