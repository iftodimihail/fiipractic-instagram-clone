import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQWKHWvzA9Lk4sBMOVtkco6pqnyB3PwbQ",
  authDomain: "fiipractic-alextoderica.firebaseapp.com",
  projectId: "fiipractic-alextoderica",
  storageBucket: "fiipractic-alextoderica.appspot.com",
  messagingSenderId: "126318687956",
  appId: "1:126318687956:web:111d4fc5d665a184776d41",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
