const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var favicon = require('serve-favicon')
require('dotenv').config();
const port = process.env.PORT || 80
//npm run dev

connectionString = `mongodb+srv://bjohns:${process.env.DB_PASSWORD}@cluster0.zmony.mongodb.net/?retryWrites=true&w=majority`
MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('mag-routine-planner')

    app.set('view engine', 'ejs')
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(favicon('./images/favicon.ico'))
    app.use(express.static('public'));


    require('./routes/index.js')(app, db)
    require('./routes/skills.js')(app, db)
    require('./routes/routines.js')(app, db)
    
    app.listen(port, function() {
        console.log(`listening on port ${port}`)
    })
  })
  .catch(console.error)



