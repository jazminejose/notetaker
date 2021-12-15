const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const { uuid } = require('uuidv4');

router.get('/api/notes', (req, res) =>{
  fs.readFile(path.join(__dirname, '..', 'data', 'db.json'), 'utf8', (err,data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
}) 

router.post('/api/notes', (req, res) => {
  const note = req.body
  note.id = uuid();
  fs.readFile(path.join(__dirname, '..', 'data', 'db.json'), 'utf8', (err, data) => {
  if (err) {console.log(err)}
  const notes = JSON.parse(data)
  notes.push(note)
  fs.writeFile(path.join(__dirname, '..', 'data', 'db.json'), JSON.stringify(notes), err => {
    if (err) { console.log(err) }
    res.sendStatus(300)
  })
  })
})

router.delete('/api/notes/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    const notes = JSON.parse(data)
    for (let i = 0; i < notes.length; i++) {
      const postedNotes = notes[i];
      if (postedNotes.id === req.params.id) {
        notes.splice(i, 1)
      }
    }
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(300)
    })
  })
})

module.exports = router;