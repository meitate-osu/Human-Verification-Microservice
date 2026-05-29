const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');   
const app = express();  

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  
app.set('view engine', '.hbs');                 

const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.render('home'); 
    });

const path = require("path");
const fs = require("fs");

const httpServer = http.createServer(app);

const multer = require("multer");
const { readdir } = require('node:fs/promises');
const { readdirSync } = require('node:fs');

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "/public/images"
});

app.post('/upload', upload.single('file'), function(req, res) {
  var file = './public/images' + '/' + req.file.originalname;
  fs.rename(req.file.path, file , function(err) {
      res.redirect('/')
  });
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/images', (req, res) => {
    fs.readdir('./public/images', (err, files) => {
        const images = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
        res.json(images);
    });
});

app.get('/read-file', (req, res) => {
    // Asynchronously read the text file
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data); // Send file content back to browser
    });
});

app.post('/write-to-file', (req, res) => {

    // fs.appendFile adds to the file; fs.writeFile overwrites it
    fs.writeFile('example.txt', 'verify', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error writing to file');
        }
        res.send('File written successfully!');
    });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});