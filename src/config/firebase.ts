// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoNRYEkLUH4nOOM9y1jip8s__yn_f6dHw",
  authDomain: "help-a-mate-891db.firebaseapp.com",
  projectId: "help-a-mate-891db",
  storageBucket: "help-a-mate-891db.appspot.com",
  messagingSenderId: "1074550149851",
  appId: "1:1074550149851:web:9274d924364a28638032fe",
  measurementId: "G-RTF9ZS05TJ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
