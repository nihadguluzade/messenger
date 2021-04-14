const express = require('express');
const app = express();
const port = 5000;

const connectionString = "mongodb+srv://admin:udhzG9kllgLjchKa@cluster0.gwmgf.mongodb.net/messenger?retryWrites=true&w=majority";

const mongodb = require('mongodb');
const {MongoClient} = mongodb;

const bodyParser = require('body-parser'); 

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {
  console.log("Connected to MongoDB");

  const db = client.db('messenger');
  const usersCollection = db.collection('users');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/users', (req, res) => {
    usersCollection.find().toArray()
      .then(results => {
        console.log("Got users");
        res.send(results);
      })
      .catch(console.error);
  });


  app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch(console.error);
