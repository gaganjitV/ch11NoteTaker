const router = require('express').Router();
const fs = require ("fs");
const { v1: uuidv1 } = require('uuid');

// notes are available at api/notes in JSON 
router.get('/notes', async (req, res) => {
  const results = await JSON.parse(fs.readFileSync("./db/db.json","utf8"));
  res.json(results);
});

// Create a new note
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  const noteJson = JSON.parse(fs.readFileSync("./db/db.json","utf8"));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv1(),
  };
  noteJson.push(newNote);
  fs.writeFileSync("./db/db.json",JSON.stringify(noteJson));
  res.json(noteJson);
});


// Delete a note
router.delete('/notes/:id', async (req, res) => {
    let note = fs.readFileSync("./db/db.json", "utf8");
    const noteJSON =  JSON.parse(note);
    const createNote = noteJSON.filter((note) => { 
      return note.id !== req.params.id;
    });
    fs.writeFileSync("./db/db.json",JSON.stringify(createNote));
    res.json("Note is deleted.");
  });

module.exports = router;