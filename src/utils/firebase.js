import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtbw4iECte76nTgOkC6k585wEivRTzQXg",
  authDomain: "instagram-clone-fda5a.firebaseapp.com",
  projectId: "instagram-clone-fda5a",
  storageBucket: "instagram-clone-fda5a.appspot.com",
  messagingSenderId: "23219287765",
  appId: "1:23219287765:web:6242bb469866511ed8145c",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
export default firebase;
