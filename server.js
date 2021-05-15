const express = require('express');
const app = express();
const port = 5000;

const configs = require('./configs.json');

const connectionString = configs.connectionString;

const mongodb = require('mongodb');
const {MongoClient, ObjectId} = mongodb;

const bodyParser = require('body-parser');

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

const _ = require("lodash");
let users = {};

io.on('connection', function (socket) {

  const socketId = socket.id;
  let userId = socket.handshake.query.userId;
  console.log(userId, 'connected');

  if (!users[userId]) users[userId] = [];

  users[userId].push(socket.id);

  io.sockets.emit("online", userId);

  socket.on('msg', function(data) {
    io.sockets.emit('newMessage', data);
  });

  socket.on('statusRequest', function(data) {
    io.to(socketId).emit('statusReport', users[data]);
  })

  socket.on('logout', function() {
    _.remove(users[userId], (u) => u == socket.id);

    if (users[userId].length == 0) {
      io.sockets.emit("offline", userId);
      delete users[userId];
    }

    console.log(userId, 'disconnected');
    console.log('Online Users:', users);
    socket.disconnect();
  });
});

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
        res.send(results);
      })
      .catch(console.error);
  });

  app.get('/api/user/_id=:userId', (req, res) => {
    usersCollection.find().toArray()
      .then(result => {
        res.send(result.filter(value => req.params.userId == value._id)[0]);
      })
      .catch(console.error);
  });

  app.get('/api/user/username=:username&password=:password', (req, res) => {
    usersCollection.find().toArray()
      .then(result => {
        res.send(result.filter(value => req.params.username == value.username && req.params.password == value.password));
      })
      .catch(console.error);
  });

  app.get('/api/user/username=:username', (req, res) => {
    usersCollection.find().toArray()
      .then(result => {
        res.send(result.filter(value => req.params.username == value.username));
      })
      .catch(console.error);
  });

  app.get('/api/user/email=:email', (req, res) => {
    usersCollection.find().toArray()
      .then(result => {
        res.send(result.filter(value => req.params.email == value.email));
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
    messagesCollection.find().toArray()
      .then(result => {
        const filtered = result.filter(value => (
          (value.destUID == req.params.u1id && value.srcUID == req.params.u2id) ||
          (value.destUID == req.params.u2id && value.srcUID == req.params.u1id)
        ));
        res.send(filtered);
      })
      .catch(console.error);
  });

  app.get('/api/conversations/uid=:uid', (req, res) => {
    messagesCollection.find().toArray()
      .then(results => {
        res.send(results.filter(conversation => conversation.destUID == req.params.uid || conversation.srcUID == req.params.uid));
      })
      .catch(console.error);
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));

}).catch(console.error);
