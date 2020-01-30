import firebase from 'firebase/app'
import 'firebase/storage'
// import {config} from "../../config/"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    cloudServerKey: process.env.FIREBASE_CLOUD_SERVER_KEY
}
// Initialize Firebase
const initializedFirebase = firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true })

const storage = firebase.storage()
export {
    storage, initializedFirebase, firebase as default
}