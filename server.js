// Import modules
const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Initalize express
const app = express();

// Specify port on which Express.js server will run
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creates routes for all files in public folder
app.use(express.static('public'));

// Creates route with note param for notes.html
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// Read data from db.json file to route
app.get('/api/notes', (req, res) => res.json(noteData));

//POST request to add new notes
app.post('/api/notes',(req,res)=>{
  console.info(`${req.method} request received to add new note`);

  const{ title, text } = req.body;
  if (title && text){
    const newNote = {
      title,
      text, 
      id:uuidv4()
    }
  
  noteData.push(newNote)
  const noteString = JSON.stringify(noteData);
  fs.writeFile(`./db/db.json`, noteString, (err) =>
  err
    ? console.error(err)
    : console.log(
        `New note written to file`
      )
);
  const response = {
    status: 'success',
    body: newNote,
  };

  console.log(response);
  res.json('worked')
}})

// Fallback route for when user attempts to visit routes dont exist
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')
  ));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


