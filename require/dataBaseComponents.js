const firebase = require('firebase/app');
const fieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
exports.db = admin.firestore();
exports.firebase = firebase;
exports.fieldValue = fieldValue;


