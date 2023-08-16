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

//declare html elements
const logoutBtnElement = document.getElementById("logoutBtn");
const profileElementsList = document.querySelectorAll(
  ".user-profile-container h2"
);
const meniuBtnElement = document.querySelectorAll(".navbar__container-btn");
const userProfileContainer = document.querySelector(".user-profile-container");
const profileNameElement = document.querySelector(".list__container-name");

//helper functions
function pushProfileData(userData) {
  let pushDataString = `Firstname: ${userData.fname}`;
  profileElementsList[0].textContent += pushDataString;
  pushDataString = `Lastname: ${userData.lname}`;
  profileElementsList[1].innerText += pushDataString;
  pushDataString = `Username: ${userData.username}`;
  profileElementsList[2].innerText += pushDataString;
  pushDataString = `Skills: ${userData.skills}`;
  profileElementsList[3].innerText += pushDataString;
  pushDataString = `${userData.fname} ${userData.lname}`;
  profileNameElement.innerText = pushDataString;
}

function getSignedUserData() {
  onAuthStateChanged(authService, (userSigned) => {
    if (userSigned) {
      const userUid = userSigned.uid;
      console.log(userUid);
      const pathDb = ref(dbService);
      get(child(pathDb, `users/${userUid}`))
        .then((userData) => {
          if (userData.exists()) {
            console.log(userData.val());
            pushProfileData(userData.val());
          } else console.log("user is signed out");
        })
        .catch((error) => {
          console.log("Error code: ", error);
        });
    } else window.location.href = "./login_page.html";
  });
}

logoutBtnElement.addEventListener("click", () => {
  signOut(authService);
  console.log("Account was signed out!");
});

meniuBtnElement[1].addEventListener("click", () => {
  console.log("Profile was pressed");
  userProfileContainer.classList.toggle("active-grid");
});

getSignedUserData();
