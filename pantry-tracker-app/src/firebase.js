// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0gyRQOyb1NFVqyJS6Cgj5qLIG9Av4wBE",
  authDomain: "pantry-tracker-49bfe.firebaseapp.com",
  projectId: "pantry-tracker-49bfe",
  storageBucket: "pantry-tracker-49bfe.appspot.com",
  messagingSenderId: "453579618362",
  appId: "1:453579618362:web:e207ac3b6c440176dd9d03",
  measurementId: "G-YKR7MCTRZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };