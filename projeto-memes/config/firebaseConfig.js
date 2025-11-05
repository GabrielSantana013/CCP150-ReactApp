// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATs6dI3VTSHsFHJsDdTHWB2o1sd3k33Dc",
  authDomain: "projetomenes.firebaseapp.com",
  databaseURL: "https://projetomenes-default-rtdb.firebaseio.com",
  projectId: "projetomenes",
  storageBucket: "projetomenes.firebasestorage.app",
  messagingSenderId: "648321692863",
  appId: "1:648321692863:web:3c22f0053901755802c20a",
  measurementId: "G-QPPDNRF8MF"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;