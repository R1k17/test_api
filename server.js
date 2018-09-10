const express = require('express');
 const app = express();

 const PORT = process.env.PORT || 3000;

 app.use(express.json());

 app.get('/', function (req, res) {
  res.send('Hello World!');
});

//  app.get('/api/*', (req, res) => {
//    res.json({ok: true});
//  });

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};