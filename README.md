# Human-Verification-Microservice
Waits for an associated txt file to be changed to the string 'verify'.
Upon it detecting that change, it converts it to 'verified'.

To request data from the microservice, you need to change the string in the text file that it is connected to to 'verify'.
An example call looks like this:

    App.post(‘/chosen_file_path’, (req, res) = > { 

        Fs.writeFile(‘chosen.txt’, ‘verify’ + ‘\n’ (err) => { 

            Res.send(‘microservice called’); 

        }); 

    });

To receive data from the microservice, you need to have your program read the string in the text file.
An example call looks like this:

    App.get(‘/chosen_file_path’, (req, res) = > { 

        Fs.readFile(‘chosen.txt’, ‘utf8’ (err, data) => { 

            Res.send(data); 

        }); 

    }); 

<img width="960" height="720" alt="Untitled drawing" src="https://github.com/user-attachments/assets/6d6ef80a-9b25-46d4-adc6-a379131484ac" />
