const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.post('/api/notes', (req,res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let notelength = (noteList.length).toString();
    newNote.id = notelength;
    noteList.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});