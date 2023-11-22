import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCE1zbuY0LXieaVm9o72D5W-jGus9TtcNc",
  authDomain: "afiwa-exchange.firebaseapp.com",
  projectId: "afiwa-exchange",
  storageBucket: "afiwa-exchange.appspot.com",
  messagingSenderId: "1084418544354",
  appId: "1:1084418544354:web:18dce0b28df182d1be04bb",
  measurementId: "G-4N1602QSRE"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
export {firebaseAuth}