import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyD15Hl3UZ8yuiNs3KljCJ0ePQgs6Wf-0ps",
    authDomain: "binder2-319a5.firebaseapp.com",
    databaseURL: "https://binder2-319a5.firebaseio.com",
    projectId: "binder2-319a5",
    storageBucket: "binder2-319a5.appspot.com",
    messagingSenderId: "890819851860",
    appId: "1:890819851860:web:3d880fb18a5d4a8749dfc1",
    measurementId: "G-F6E8HMJB7G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage= firebase.storage()
  export {
      storage, firebase as default
  }