import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDW-LP8yeNIhdmALdBo4sdPIFTKSNsh3Hw",
  authDomain: "fiipractic-instagram-clo-5458e.firebaseapp.com",
  projectId: "fiipractic-instagram-clo-5458e",
  storageBucket: "fiipractic-instagram-clo-5458e.appspot.com",
  messagingSenderId: "848826135390",
  appId: "1:848826135390:web:b6bc3c73edd58a272555cf",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
