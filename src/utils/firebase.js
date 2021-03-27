import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoEoJw9UswMbL_re6Rw47kJpsDdFSRF_Y",
  authDomain: "fiipractic-instagram-clo-27a84.firebaseapp.com",
  projectId: "fiipractic-instagram-clo-27a84",
  storageBucket: "fiipractic-instagram-clo-27a84.appspot.com",
  messagingSenderId: "195533958796",
  appId: "1:195533958796:web:c7a579905610ded95555a9"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

export {auth, db, storage};
export default firebase;