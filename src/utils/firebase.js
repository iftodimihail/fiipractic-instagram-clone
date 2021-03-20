import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsHfqX0qwWDmPC1qe4S1BYF3h2AbBJCuA",
  authDomain: "instagram-clone-91e88.firebaseapp.com",
  projectId: "instagram-clone-91e88",
  storageBucket: "instagram-clone-91e88.appspot.com",
  messagingSenderId: "126999824339",
  appId: "1:126999824339:web:691ffa597e818b049d5126",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
