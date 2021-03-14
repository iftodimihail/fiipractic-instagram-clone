import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBq8l1ulu8OTYE60eBJX25oRbc0gQrVE0",
  authDomain: "instagram-fiipractic.firebaseapp.com",
  projectId: "instagram-fiipractic",
  storageBucket: "instagram-fiipractic.appspot.com",
  messagingSenderId: "32845575386",
  appId: "1:32845575386:web:b209018b6f808de0ada1e3",
  measurementId: "G-WXPEZRBD4Y",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
