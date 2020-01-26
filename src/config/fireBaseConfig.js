import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBfabs7hjM38iufAEGazLloZUS9t9DfUy8",
    authDomain: "binder-1579608819026.firebaseapp.com",
    databaseURL: "https://binder-1579608819026.firebaseio.com",
    projectId: "binder-1579608819026",
    storageBucket: "binder-1579608819026.appspot.com",
    messagingSenderId: "320654367396",
    appId: "1:320654367396:web:7ae20fc56bc03fafece431",
    measurementId: "G-ELK2CBHNG4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage= firebase.storage()
  export {
      storage, firebase as default
  }