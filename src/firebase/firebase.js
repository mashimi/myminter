import firebase from 'firebase/app'
import 'firebase/storage'

var  firebaseConfig = {
  apiKey: "AIzaSyD9JZ1tbrJVxF1mBF5nLeh-AdHkoZgzxCM",

  authDomain: "nftminter-23858.firebaseapp.com",

  projectId: "nftminter-23858",

  storageBucket: "nftminter-23858.appspot.com",

  messagingSenderId: "370355238540",

  appId: "1:370355238540:web:82fe0246045752dce12da9",

  measurementId: "G-1NWDZ0Z0RT"

};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage()


export  {
    storage, firebase as default
  }