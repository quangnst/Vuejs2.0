import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyADw-oCQbxAXqquMNhSBRse3GOwwRm4n-M",
  authDomain: "vue-authen-33948.firebaseapp.com",
  databaseURL: "https://vue-authen-33948.firebaseio.com",
  projectId: "vue-authen-33948",
  storageBucket: "vue-authen-33948.appspot.com",
  messagingSenderId: "824858329646",
  appId: "1:824858329646:web:dfadbf92f8bee5facf55bf",
  measurementId: "G-2FN8XCXCHV",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");


const productsCollection = db.collection("products");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  productsCollection,
};
