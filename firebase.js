// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrDtseNKXJS7uPtpyzTdGyQAMqWDJFSKE",
  authDomain: "blogapp-c2388.firebaseapp.com",
  projectId: "blogapp-c2388",
  storageBucket: "blogapp-c2388.appspot.com",
  messagingSenderId: "764927585237",
  appId: "1:764927585237:web:62d67ec01f32c346ad6b5c",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export { auth };
