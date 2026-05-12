const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname, 'public')));        //Added this to fix Captcha error (Ian)
app.use(express.static('public'))

const path = require("path");
const fs = require("fs");


fs.watch('example.txt', (eventType, filename) => {
    if (eventType === 'change') {
        const data = fs.readFileSync('example.txt', 'utf8');
        if (data === 'verify') {
            fs.writeFile('example.txt', 'verified', (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error writing to file');
                    }
                })
        }
    }

})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});