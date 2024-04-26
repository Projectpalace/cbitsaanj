const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('hello')
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log('file saved')

  res.send('File uploaded successfully.');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
