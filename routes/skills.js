const ObjectId = require('mongodb').ObjectId;

const valueFromDifficulty = (difficulty) => {
  switch(difficulty) {
    case 'A':
      return 0.1;
    case 'B':
      return 0.2;
    case 'C':
      return 0.3;
    case 'D':
      return 0.4;
    case 'E':
      return 0.5;
    case 'F':
      return 0.6;
    case 'G':
      return 0.7;
    case 'H':
      return 0.8;
    case 'I':
      return 0.9;
    case 'I':
      return 1.0;
    default:
      return 0.0;
  } 
}

module.exports = function (app, db) {
  const skillsCollection = db.collection('skills')

  app.get('/skills', (req, res) => {
    skillsCollection.find().toArray()
    .then(results => {
      res.render('skills/index.ejs', { skills: results })
    })
    .catch(error => console.error(error))
  })

  // create skill
  app.post('/skills', (req, res) => {
    skill = req.body
    skill['value'] = valueFromDifficulty(skill['difficulty']);
    skillsCollection.insertOne(skill)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
    res.redirect('skills')
  })

  // delete skill
  app.delete('/skills', (req, res) => {
    skillsCollection.deleteOne(
      { _id: new ObjectId(req.body.skillId) },
    )
    .then(result => {
      console.log(`Deleted skill ${req.body.skillId}`)
      res.json(`Deleted skill ${req.body.skillId}`)
    })
    .catch(error => console.error(error))
  })

  // show skill
  app.get('/skills/:id', (req, res) => {
    skillsCollection.findOne(
      { _id: new ObjectId(req.params.id) },
    )
    .then(skill => {
      res.render('skills/edit.ejs', { skill: skill })
    })
    .catch(error => console.error(error))
  })
  
  // update skill
  app.post('/skills/:id', (req, res) => {
    skill = req.body
    skill['value'] = valueFromDifficulty(skill['difficulty']);
    skillsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      {
        $set: skill
      },
      {
        returnNewDocument: true,
        returnDocument: 'after',
      }
    )
    .then(updatedSkill => {
      res.render('skills/edit.ejs', { skill: updatedSkill.value })
    })
    .catch(error => console.error(error))
  })
}
