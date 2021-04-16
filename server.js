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

  const changeStream = messagesCollection.watch();

  changeStream.on('change', (changes) => {
    console.log('changed', changes);
  })

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

  app.get('/api/messages', (req, res) => {
    messagesCollection.find().toArray()
      .then(results => {
        console.log("Got messages");
        res.send(results);
      })
      .catch(console.error);
  });

  app.get('/api/message/:_id', (req, res) => {
    messagesCollection.findOne({"_id": new ObjectId(req.params._id)})
      .then(result => {
        console.log("Got message");
        console.log(result);
        res.send(result);
      })
      .catch(console.error);
  });

  app.get('/api/conversation/u1id=:u1id&u2id=:u2id', (req, res) => {
    console.log(req.params.u1id, req.params.u2id);
    messagesCollection.find().toArray()
      .then(result => {
        console.log("Got conversation of length:", result.length);
        const filtered = result.filter(value => (
          (value.destUID == req.params.u1id && value.srcUID == req.params.u2id) || 
          (value.destUID == req.params.u2id && value.srcUID == req.params.u1id)
        ));
        res.send(filtered);
      })
      .catch(console.error);
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch(console.error);
