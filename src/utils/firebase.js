import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3rgxlf8vFQGdv9j0acUdp-8Z5VRFuB6s",
  authDomain: "fiipractic-instagram-clo-40e43.firebaseapp.com",
  projectId: "fiipractic-instagram-clo-40e43",
  storageBucket: "fiipractic-instagram-clo-40e43.appspot.com",
  messagingSenderId: "368302811204",
  appId: "1:368302811204:web:b628b20c53cb53322a3411",
  measurementId: "G-N7SFJHJ3XN",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
