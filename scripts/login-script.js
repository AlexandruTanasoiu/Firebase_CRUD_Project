// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Your web app's Firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyBez6BmymCOil4cZggw33AT_3WXcmj9QMc",
  authDomain: "fir-project-55d21.firebaseapp.com",
  databaseURL: "https://fir-project-55d21-default-rtdb.firebaseio.com",
  projectId: "fir-project-55d21",
  storageBucket: "fir-project-55d21.appspot.com",
  messagingSenderId: "599313505187",
  appId: "1:599313505187:web:bc03cf129c32a800f25816",
  measurementId: "G-GEF6BMSXJ5",
};

// Initialize Firebase SDK
const firebaseInit = initializeApp(firebaseConfig);
const authService = getAuth(firebaseInit);
const dbService = getDatabase(firebaseInit);

//declare the html elements

const emailInputElement = document.getElementById("usernameRead");
const passInputElement = document.getElementById("passwordRead");
const loginBtnElement = document.getElementById("loginBtn");
const signUpBtnElement = document.getElementById("signUpBtn");

loginBtnElement.addEventListener("click", () => {
  const emailCredentials = emailInputElement.value;
  const passCredentials = passInputElement.value;
  console.log("login button was pressed");
  console.log(emailInputElement.value, passInputElement.value);

  signInWithEmailAndPassword(authService, emailCredentials, passCredentials)
    .then((userSigned) => {
      console.log("Usersigned", userSigned.user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      alert(`You have an error: ${error.code}`);
    });
});

signUpBtnElement.addEventListener("click", () => {
  window.location.href = "signup_page.html";
});
