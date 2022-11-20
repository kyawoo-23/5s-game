import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBNJq3GWTYipyQcSBWeMdpnVj5SbK5YsV8",
  authDomain: "fir-game-2060b.firebaseapp.com",
  projectId: "fir-game-2060b",
  storageBucket: "fir-game-2060b.appspot.com",
  messagingSenderId: "515558570943",
  appId: "1:515558570943:web:7a5e79707e94322d02ff0a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore()

// init firebase auth
const auth = getAuth()

// init firebase google auth
const googleAuth = new GoogleAuthProvider()

export { db, auth, googleAuth }
