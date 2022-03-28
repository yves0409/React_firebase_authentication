var admin = require("firebase-admin");
var serviceAccount = require("../config/fbServiceAccountKey.json");

//FIREBASE INITIALIZATION BACKEND
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
