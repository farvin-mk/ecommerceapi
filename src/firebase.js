// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqNtknR91zSnX208Kl_zleVytTzGQzk1s",
  authDomain: "ecommerce-af453.firebaseapp.com",
  projectId: "ecommerce-af453",
  storageBucket: "ecommerce-af453.appspot.com",
  messagingSenderId: "1078488616190",
  appId: "1:1078488616190:web:26287e564bcd4f82c729af",
  measurementId: "G-XZVRL9N587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;