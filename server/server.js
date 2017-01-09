
const config = require('../../secret/secret')();
const cors = require('cors')
const express = require('express')
const session = require('client-sessions');
const path = require('path');

// const secret = require('../../secret/secret.js')()
// const config = require('../config.js')()

const login = require('./routes/login');
const app = express()
const port = process.env.SERVER_PORT || config.serverPort || 5000


// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
//
// app.use(cors(corsOptions))


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

// get react build
app.use(express.static(path.resolve(__dirname, '../', 'client/build')));

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here_XXXXX',//TODO make random
    duration: config.cookieDuration,
    activeDuration: config.cookieDuration
}));


app.get('/', function(req, res, next) {
  res.sendFile('index.html')
});

app.use('/login', login);


app.listen(port);
console.log("listening on port " + port)
