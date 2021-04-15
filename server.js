const express = require('express');
const app = express();
const port = 5000;

const configs = require('./configs.json');

const connectionString = configs.connectionString;

const mongodb = require('mongodb');
const {MongoClient, ObjectId} = mongodb;

const bodyParser = require('body-parser'); 

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {
  console.log("Connected to MongoDB");

  const db = client.db('messenger');
  const usersCollection = db.collection('users');
  const messagesCollection = db.collection('messages');

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

  app.put('/api/users', (req, res) => {
    console.log(req.body);
    req.body._id = new ObjectId(req.body._id);
    usersCollection.save(req.body)
      .then(result => {
        console.log("Save user");
        res.send(result);
      })
      .catch(console.error);
  });

  app.put('/api/message', (req, res) => {
    console.log(req.body);
    req.body._id = new ObjectId(req.body._id);
    messagesCollection.save(req.body)
      .then(result => {
        console.log("Message sent");
        res.send(result);
      })
      .catch(console.error);
  });

  app.get('/api/message', (req, res) => {
    messagesCollection.find().toArray()
      .then(results => {
        console.log("Got messages");
        res.send(results);
      })
      .catch(console.error);
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch(console.error);
