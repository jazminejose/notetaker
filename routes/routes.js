const router = require('express').Router()
const path = require('path')
const fs = require('fs')

router.get('/api/notes', (req, res) =>{
  fs.readFile(path.join(__dirname, '..', 'data', 'db.json'), 'utf8', (err,data) => {
    if (err) {console}
  })
}) 
router.post('/api/notes')
router.delete('/api/notes/:id')