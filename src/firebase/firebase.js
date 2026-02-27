
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY6rLkJVBEuK0XfZvC5Z0_DNNSwTKmFqk",
  authDomain: "dashboardtask-2fa72.firebaseapp.com",
  projectId: "dashboardtask-2fa72",
  storageBucket: "dashboardtask-2fa72.firebasestorage.app",
  messagingSenderId: "831312036856",
  appId: "1:831312036856:web:73c4aea2e7d9c942ef8c0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
