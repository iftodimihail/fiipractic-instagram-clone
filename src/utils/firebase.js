import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3VP1a6waDNhRfJhiseWdOx01dxdrNrpc",
  authDomain: "fiipractic-instagram-clo-cf2bc.firebaseapp.com",
  projectId: "fiipractic-instagram-clo-cf2bc",
  storageBucket: "fiipractic-instagram-clo-cf2bc.appspot.com",
  messagingSenderId: "950447642740",
  appId: "1:950447642740:web:f93751b1b2ed35cbd19921",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
