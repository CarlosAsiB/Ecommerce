
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBofs-fsFDJtXkBOZ6oHX9YgX32TQqPKsU",
  authDomain: "reactjs-e4324.firebaseapp.com",
  projectId: "reactjs-e4324",
  storageBucket: "reactjs-e4324.appspot.com",
  messagingSenderId: "63704139360",
  appId: "1:63704139360:web:5530b3599ed7f7ccfca505"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);