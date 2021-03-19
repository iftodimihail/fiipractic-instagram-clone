import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDc-enoQ9H17YCd1ntPYx8dh5YFn-dcVZo",
  authDomain: "fiipractic-instagram-clo-669e7.firebaseapp.com",
  projectId: "fiipractic-instagram-clo-669e7",
  storageBucket: "fiipractic-instagram-clo-669e7.appspot.com",
  messagingSenderId: "830826932474",
  appId: "1:830826932474:web:cade410a6fc885405b0143"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
