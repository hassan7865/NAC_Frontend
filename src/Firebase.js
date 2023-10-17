// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDihF6g-q9qzAdQz-wC4mByFt3jLdd0SIw",
  authDomain: "nedblogs-ae3d8.firebaseapp.com",
  projectId: "nedblogs-ae3d8",
  storageBucket: "nedblogs-ae3d8.appspot.com",
  messagingSenderId: "178358875393",
  appId: "1:178358875393:web:432e92e189587413cb5700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app