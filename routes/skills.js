const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, db) {
  const skillsCollection = db.collection('skills')


  app.get('/skills', (req, res) => {
    skillsCollection.find().toArray()
    .then(results => {
      res.render('skills/index.ejs', { skills: results })
    })
    .catch(error => console.error(error))
  })

  app.post('/skills', (req, res) => {
    skillsCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
    res.redirect('skills')
  })

  app.delete('/skills', (req, res) => {
    skillsCollection.deleteOne(
      { _id: new ObjectId(req.body.skillId) },
    )
    .then( result => {
      console.log(result)
      res.json(`Deleted skill ${req.body.skillId}`)
   })
    .catch(error => console.error(error))
  })
}
