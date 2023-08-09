const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 3002;

app.use(express.static('public'));
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});



app.get('/api/notes', (req, res) => res.json(noteData));

// GET * should returns index.html file
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')
  ));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);





// to do
// deploy the entire application to Heroku
// when click save THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column THEN that note appears in the right-hand column
// ???WHEN I click on the Write icon in the navigation at the top of the page THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
// The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module
