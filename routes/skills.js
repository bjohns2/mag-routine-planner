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
    skill = req.body
    console.log()
    let value = 0.0;
    switch(skill['difficulty']) {
      case 'A':
        value = 0.1;
        break;
      case 'B':
        value = 0.2;
        break;
      case 'C':
        value = 0.3;
        break;
      case 'D':
        value = 0.4;
        break;
      case 'E':
        value = 0.5;
        break;
      case 'F':
        value = 0.6;
        break;
      case 'G':
        value = 0.7;
        break;
      case 'H':
        value = 0.8;
        break;
      case 'I':
        value = 0.9;
        break;
      case 'I':
        value = 1.9;
        break;
      default:
        value = 0.0;
        break;
    } 
    skill['value'] = value;
    skillsCollection.insertOne(skill)
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
