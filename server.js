const express = require('express');
 const app = express();
 const mongoose = require('mongoose');

 mongoose.Promise = global.Promise;

//  const PORT = process.env.PORT || 3000;
const {PORT, DATABASE_URL} = require('./config');
const {ToDo} = require('./models');

 app.use(express.json());

 app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/todos', function (req, res) {
  ToDo.find()
  .then(todos => {
    res.json({
      todos: todos.map(todo => todo.name)
    })
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: "Internal server error"});
  })
});

//  app.get('/api/*', (req, res) => {
//    res.json({ok: true});
//  });

let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
// `closeServer` function is here in original code

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};


 module.exports = { app, runServer, closeServer };