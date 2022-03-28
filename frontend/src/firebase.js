import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAVdzMUdx-jg1QNg26y3fNoEXzYtTGEiS0",
  authDomain: "petercommerce-89b02.firebaseapp.com",
  projectId: "petercommerce-89b02",
  storageBucket: "petercommerce-89b02.appspot.com",
  messagingSenderId: "855912526661",
  appId: "1:855912526661:web:45be42c23fe9cee528442c",
};
// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
