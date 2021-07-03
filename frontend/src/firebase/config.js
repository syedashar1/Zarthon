import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';



// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyABj9vMVc-IXBdAnLaz-Er8h-cqbI9jfzs",
  authDomain: "zarthon123-57667.firebaseapp.com",
  projectId: "zarthon123-57667",
  storageBucket: "zarthon123-57667.appspot.com",
  messagingSenderId: "320674900103",
  appId: "1:320674900103:web:59c4ff571e4e9b1cdb3022",
  measurementId: "G-DSQ4G48GCP"
};
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const fireDb = firebase.initializeApp(firebaseConfig);

export { projectStorage, projectFirestore, timestamp };