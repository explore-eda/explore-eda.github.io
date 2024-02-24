const path = require('path');
const express = require('express');
const multer = require('multer');
const port = process.env.PORT || 8080;
const app = express();

process.env.PWD = process.cwd();

app.use(express.static(process.env.PWD));

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'saved/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    //cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });



app.get('/', (req, res) => {
	res.sendFile(__dirname + req.params[0]);
});
app.get(/^(.+)$/, (req, res) => {
	res.sendFile(__dirname + req.params[0]);
});


app.post('/saved', upload.single('file'), (req, res) => {
    // File has been uploaded, you can handle any additional logic here
    res.send('file uploaded successfully');
	//res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

