import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMLxPHYxKB05DwQhuqk5GAWtt6dlF0Vaw",
  authDomain: "fiipractic-instagram-clo-35289.firebaseapp.com",
  projectId: "fiipractic-instagram-clo-35289",
  storageBucket: "fiipractic-instagram-clo-35289.appspot.com",
  messagingSenderId: "760603321390",
  appId: "1:760603321390:web:e18a7be396e82ab385abbf",
  measurementId: "G-YYNYNMPQFX",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
