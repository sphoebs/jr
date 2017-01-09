const config = require('../../../secret/secret')();
const express = require('express');
const fetch = require('node-fetch');
const google = require('googleapis');
const google_OAuth2 = google.auth.OAuth2;
const loginRouter = express.Router();
const session = require('client-sessions');




var google_oauth2Client = new google_OAuth2(
    config.googleAuth.client_id,
    config.googleAuth.client_secret,
    config.googleAuth.redirect_uris[0]
);

var google_auth_url = google_oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as string
    scope: config.googleAuth.SCOPES
});


loginRouter.use(function(req, res, next) {
  //TODO  .. some logic here to verify authentication, otherwise redirect to login screen
  next();
});


/* GET users listing. */
loginRouter.get('/', function(req, res, next) {
  res.send('resoponse from login ');
});

loginRouter.get('/isLoggedIn/', function(req, res, next) {
  console.log('in isLoggedIn' + req.session)
  res.setHeader('Content-Type', 'application/json');

  //console.log(req.session)
  if (req.session && req.session.user) {
    res.send(JSON.stringify({ user: req.session.user }))
  }

//    res.send("already logged in. hi "+req.session.user); }
  else {
    console.log('no login');
    res.send(JSON.stringify({}));
    //console.log('no login')
  };
});

loginRouter.get('/google/', function(req, res, next) {
  //res.send('respond google login');
  console.log('in login' + req.session)
  //console.log(req.session)
  if (req.session && req.session.user) {
    console.log('aleadt =y in ' + req.session)
    res.redirect('http://localhost:3000/');
    //res.send("already logged in. hi "+req.session.user);
  }
  else res.redirect(google_auth_url );
});

loginRouter.get('/google/callback', function(req, res, next) {
  //console.log('\n google callback. Code: '+ req.query.code);
  console.log('in callback')
   let code = req.query.code;
   console.log('code:'+ code)
   google_oauth2Client.getToken(code, (err, tokens) => {
       if(!err) {
           console.log("tokens: " + tokens);
           req.session["tokens"] = tokens;
           req.session.test = "hola";
           //res.send("Login successful");
           google_oauth2Client.setCredentials(tokens);
           fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+tokens.access_token)
               .then( (response) => { return response.json()} )
               .then (  (json_response) => {
                   console.log(json_response);
                   req.session.user = json_response.email;
                   console.log(req.session.user);
                   //res.send('hei '+req.session.user);
                   res.redirect('/');
               }   )
               .catch(  () => {console.log("fetch error")}   )//TODO error mgmt in this function
       }
       else{console.log(err);
       //res.send("Login failed");
       }


   })
})

module.exports = loginRouter;
