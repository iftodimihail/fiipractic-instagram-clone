import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBrJChXWlkRYlDuZR5sJEaqxmccGUAnKvA",
    authDomain: "reactjslearning-bf31e.firebaseapp.com",
    projectId: "reactjslearning-bf31e",
    storageBucket: "reactjslearning-bf31e.appspot.com",
    messagingSenderId: "1050518002770",
    appId: "1:1050518002770:web:f5c25763442faef3e5538b",
    measurementId: "G-B3X613WGT5"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { auth, db, storage }
export default firebase
