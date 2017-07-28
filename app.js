// 'use strict';
//
// const config = require('./etc/config.js');

const express = require('express')
const app = express()

app.use(express.static('public'));

// // Firebase Setup
// const admin = require('firebase-admin');
// admin.initializeApp({
//   credential: admin.credential.cert(config.firebase.service_account),
//   databaseURL: `https://${config.firebase.service_account.project_id}.firebaseio.com`
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
