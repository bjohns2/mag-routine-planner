const ObjectId = require('mongodb').ObjectId;


// Create (POST) - Make something
// Read (GET)- Get something
// Update (PUT) - Change something
// Delete (DELETE)- Remove something

module.exports = function (app, db) {
  const skillsCollection = db.collection('skills')
  const routinesCollection = db.collection('routines')

  // routine index
  app.get('/routines', (req, res) => {
    routinesCollection.find().toArray()
    .then(results => {
      res.render('routines/index.ejs', { routines: results })
    })
    .catch(error => console.error(error))
  })

  // create routine
  app.post('/routines', (req, res) => {
    routinesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
    res.redirect('routines')
  })

  // show routine
  app.get('/routines/:id', (req, res) => {
    console.log('showing routine')
    routinesCollection.findOne(
      { _id: new ObjectId(req.params.id) },
    )
    .then(routine => {
      skillsCollection.find({ event: routine.event }).toArray()
      .then(skills => {
        res.render('routines/show.ejs', { routine: routine, skills: skills })
      })
    })
    .catch(error => console.error(error))
  })

  // update routine
  app.post('/routines/:id', (req, res) => {
    routinesCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      {
        $set: req.body
      },
      {
        returnNewDocument: true,
        returnDocument: 'after',
      }
    )
    .then(routine => {
      skillsCollection.find({ event: routine.value.event }).toArray()
      .then(skills => {
        res.render('routines/show.ejs', { routine: routine.value, skills: skills })
      })
    })
    .catch(error => console.error(error))
  })

  app.delete('/routines', (req, res) => {
    routinesCollection.deleteOne(
      { _id: new ObjectId(req.body.routineId) },
    )
    .then( result => {
      console.log(result)
      res.json(`Deleted routine ${req.body.routineId}`)
   })
    .catch(error => console.error(error))
  })
}
