import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsuX4S1U_Dexgr1bl_0TI2qgO-kVOcsTs",
  authDomain: "instagram-clone-16294.firebaseapp.com",
  projectId: "instagram-clone-16294",
  storageBucket: "instagram-clone-16294.appspot.com",
  messagingSenderId: "475213754378",
  appId: "1:475213754378:web:cbd47baeeae73d2663aff3",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
