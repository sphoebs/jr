const session = require('client-sessions');
const express = require('express')
const path = require('path');

// const secret = require('../../secret/secret.js')()
// const config = require('../config.js')()

const app = express()
const port = process.env.SERVER_PORT || 3000

// get react build
app.use(express.static(path.resolve(__dirname, '../', 'client/build')));


app.get('/', function(req, res, next) {
  res.sendFile('index.html')
});



app.listen(port);
console.log("listening on port " + port)
