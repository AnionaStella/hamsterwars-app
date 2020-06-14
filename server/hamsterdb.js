const firebase = require("firebase")
// Required for side-effects
require("firebase/firestore")
const firebaseKey = require('./firebaseKey.json')
const hamsterData = require('./data.json')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  firebaseKey,
  authDomain: "hamster-project.firebaseapp.com",
  projectId: "hamster-project"
});

const db = firebase.firestore()

//create firestore database of hamsters
let hamsters = hamsterData

hamsters.forEach(hamster => {
  console.log(hamster.id)
  db.collection('hamsters').doc('' + hamster.id).set(hamster)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch(function (error) {
      console.error("Error adding document: ", error)
    });
});