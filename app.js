'use strict';

const config = require('./etc/config.js');

// Modules imports
const express = require('express');

var bodyParser = require('body-parser');


// // Firebase Setup
// const admin = require('firebase-admin');
// admin.initializeApp({
//   credential: admin.credential.cert(config.firebase.service_account),
//   databaseURL: `https://${config.firebase.service_account.project_id}.firebaseio.com`
// });

// ExpressJS setup
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));


// app.get('*', (req, res) => {
//   error_404(res);
// })

// Start the server
var server = app.listen(6000, function () {
  console.log('Serving on 6000');
});
