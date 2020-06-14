const admin = require("firebase-admin");

// const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "project_id": process.env.PROJECT_ID
  }),
  databaseURL: "https://hamster-project.firebaseio.com"
});

// serviceAccount
const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  auth,
  db
}