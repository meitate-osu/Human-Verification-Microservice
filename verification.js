const express = require('express');
const fs = require('fs');

const app = express();
const HOST = '127.0.0.1';
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function handleFileChange() {
    try {
        const data = fs.readFileSync('example.txt', 'utf8');

        if (data === 'verify') {
            fs.writeFileSync('example.txt', 'verified');
        }
    } catch (err) {
        console.error('File processing error:', err);
    }
}

fs.watch('example.txt', (eventType) => {
    if (eventType === 'change') {
        handleFileChange();
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});