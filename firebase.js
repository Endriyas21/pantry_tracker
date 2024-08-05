// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw0xIiX_qdF2P76pn1r-QG4jmGYIVgLBU",
  authDomain: "inventory-management-1bfaa.firebaseapp.com",
  projectId: "inventory-management-1bfaa",
  storageBucket: "inventory-management-1bfaa.appspot.com",
  messagingSenderId: "175359387966",
  appId: "1:175359387966:web:8bd6f7491e61768f64646f",
  measurementId: "G-BCR0Z3Y78H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
