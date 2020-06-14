const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hamster-project.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  auth,
  db
}