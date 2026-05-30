# Verification-Microservice

## Description

This Verification Miroservice utilizes a text file to validate that a user is a human being.

Applications with specific forms or buttons that need security can, when pressed, send a string to a 'verification.txt' requesting verification from the microservice, which then writes a response into the text file which can be used by the receiving application.

## How to Run

Install NPM:

```bash
npm install
```

Start the microservice:

```bash
npm start
```

The microservice will run locally at:

```text
http://localhost:3000
```

# How to Test

After using the start command, you can either enter open the application in your broswer by entering in the URL or within your programming tool if the functionality is present such as VSCode.

## Required Request Parameters

The request must be a string.

### Example Request Using JavaScript

```javascript
app.post('/write-to-file', (req, res) => {
    fs.writeFile('example.txt', 'verify', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error writing to file');
        }
        res.send('File written successfully!');
    });
});
```

## How to Receive Data from the Microservice

Once the primary application writes into the text file, the microservice will respond by replacing what is written with a separate string.

To receive this string from the text file, you can use a JavaScript function that looks like this:

```javascript
app.get('/read-file', (req, res) => {
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data); 
    });
});
```

## Error Response

If there is an error in the process of the microservice writing into the txt file, it will return the following message to the use:
```javascript
return res.status(500).send('Error writing to file');
```

## UML Sequence Diagram

<img width="960" height="720" alt="Untitled drawing" src="https://github.com/user-attachments/assets/6d6ef80a-9b25-46d4-adc6-a379131484ac" />
