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

// declare document form elements
const firstNameElement = document.getElementById("fnameInput");
const lastNameElement = document.getElementById("lnameInput");
const emailUserElement = document.getElementById("emailInput");
const userNameElement = document.getElementById("usernameInput");
const passUserElement = document.getElementById("passwordInput");
const confirmPassUserElement = document.getElementById("confirmPassword");
const languageSelectionElement = document.querySelectorAll(
  ".checkbox__container-input"
);
const signUpBtnElement = document.getElementById("signUpBtn");

//class functions
class User {
  constructor(
    firstName,
    lastName,
    emailUser,
    userName,
    passUser,
    languageList
  ) {
    this.fname = firstName;
    this.lname = lastName;
    this.email = emailUser;
    this.username = userName;
    this.pass = passUser;
    this.skills = languageList;
  }
}

//helper functions

function createNewUser(userEmail, userPass) {
  createUserWithEmailAndPassword(authService, userEmail, userPass)
    .then((createdUser) => {
      console.log("User created!");
    })
    .catch((error) => {
      console.log(
        `error triggered \n error code: ${error.code} \n error message: ${error.message}`
      );
      alert(`Error to create your account ${error.code}`);
    });
}

function pushUserData(
  userId,
  firstName,
  lastName,
  emailUser,
  userName,
  passUser,
  languageList
) {
  set(
    ref(dbService, `users/${userId}`),
    new User(firstName, lastName, emailUser, userName, passUser, languageList)
  );
}

function getDataForm() {
  const firstName = firstNameElement.value;
  firstNameElement.value = "";
  const lastName = lastNameElement.value;
  lastNameElement.value = "";
  const emailUser = emailUserElement.value;
  emailUserElement.value = "";
  const userName = userNameElement.value;
  userNameElement.value = "";
  const passUser = passUserElement.value;
  passUserElement.value = "";
  const confirmPassUser = confirmPassUserElement.value;
  confirmPassUserElement.value = "";
  const languageList = [];
  languageSelectionElement.forEach((input) => {
    input.checked ? languageList.push(input.value) : "";
    input.checked = false;
  });

  if (emailUser && userName && passUser && confirmPassUser) {
    if (passUser === confirmPassUser) {
      createNewUser(emailUser, passUser);
      // assign a name to account
      onAuthStateChanged(authService, (signedUser) => {
        if (signedUser) {
          signedUser.displayName = userName;
          const userId = signedUser.uid;
          pushUserData(
            userId,
            firstName,
            lastName,
            emailUser,
            userName,
            passUser,
            languageList
          );
          console.log("User data were stored!");
        } else console.log("User is signed out!");
      });
    } else alert("Password didn't match!");
    signOut(authService);
  } else alert("Fields cannot be empty!");
}

signUpBtnElement.addEventListener("click", (event) => {
  event.preventDefault();
  getDataForm();
});
