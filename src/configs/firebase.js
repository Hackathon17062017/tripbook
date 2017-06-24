import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCGlC2wXBV-NyYhlX5jt-G4AwWKu4yRSjY",
  authDomain: "tripbook-7b00c.firebaseapp.com",
  databaseURL: "https://tripbook-7b00c.firebaseio.com",
  projectId: "tripbook-7b00c",
  storageBucket: "tripbook-7b00c.appspot.com",
  messagingSenderId: "59596776783"
};

const firebaseApp = firebase.initializeApp(config);
const database = firebase.database();
const server = firebase.database;
export {firebaseApp, database, server};
