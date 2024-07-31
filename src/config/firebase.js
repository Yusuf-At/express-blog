// src/config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://express-blog-f1833.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db };