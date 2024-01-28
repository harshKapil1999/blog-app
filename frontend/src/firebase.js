// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c3f97.firebaseapp.com",
  projectId: "mern-blog-c3f97",
  storageBucket: "mern-blog-c3f97.appspot.com",
  messagingSenderId: "414848548108",
  appId: "1:414848548108:web:91c9d087d984e442555d29",
  measurementId: "G-BPT35D64CM"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);