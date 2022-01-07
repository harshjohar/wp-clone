// Firebase 9
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDqJEa1NBNl2yCCA6pfPEP2ApN4VshKFSw",
    authDomain: "whatsapp-harsh.firebaseapp.com",
    projectId: "whatsapp-harsh",
    storageBucket: "whatsapp-harsh.appspot.com",
    messagingSenderId: "313559761751",
    appId: "1:313559761751:web:c56a49682c5b1888063412",
};

// Initialize Firebase
// const apps = getApps();
// const app = !apps.length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
