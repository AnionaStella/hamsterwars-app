const admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "project_id": process.env.PROJECT_ID
  }),
  databaseURL: "https://hamster-project.firebaseio.com"
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  auth,
  db
}