import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCXUgP5665ztGX9hZn7ncqtz7eat-2J-f8",
  authDomain: "nedamission.firebaseapp.com",
  projectId: "nedamission",
  storageBucket: "nedamission.appspot.com",
  messagingSenderId: "301458115959",
  appId: "1:301458115959:web:f38ef37f802dd9e0a4a572"
};

const app = initializeApp(firebaseConfig);
export default app;