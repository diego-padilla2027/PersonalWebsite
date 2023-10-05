const express = require('express');
const port = 80;
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');



// app.use('/html', express.static('project/html'));
app.use(express.static('project'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/project/main-page.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



app.post('/button-pressed', bodyParser.json(),(req, res) => {
  // const textInput = req.body.textInput;
  // const dateInput = req.body.dateInput;
  const { textInput, dateInput } = req.body;
  console.log('Text Input:', textInput);
  console.log('Date Input', dateInput);
  res.send('Button Pressed with Text Inputs: ' + textInput + ' and ' + dateInput );
  const contentToAppend = textInput + " visited the page on " + dateInput + '\n';
  
  fs.appendFile('./entries.txt', contentToAppend, (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('Content appended to file.');
    }});
});

app.get('/get-entries', (req, res) => {
  fs.readFile('./entries.txt', 'utf8', (err, txtContent) => {
      if (err) {
          console.error('Error reading TXT file:', err);
          res.status(500).json([]);
          return;
      }

      const entries = txtContent.split('\n').filter(entry => entry.trim() !== '');
      res.json(entries);
  });
});