
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCBHmxM1AQgYevJzc43y78IcvW0noI6eto",
  authDomain: "color-project-b606a.firebaseapp.com",
  projectId: "color-project-b606a",
  storageBucket: "color-project-b606a.appspot.com",
  messagingSenderId: "749080360565",
  appId: "1:749080360565:web:44cfa06392cf8766c46a3c"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)