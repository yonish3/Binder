
import * as firebase from "firebase/app";
import "firebase/messaging";
import {initializedFirebase} from './config/fireBaseConfig'

// const initializedFirebaseApp = firebase.initializeApp({
// Project Settings => Add Firebase to your web app
//   messagingSenderId: "890819851860"
// });
const messaging = initializedFirebase.messaging();
messaging.usePublicVapidKey(
// Project Settings => Cloud Messaging => Web Push certificates
  "BFdbt5j8SC-NQRe0GjUEE2-Mnwx2N57tRrMAQDzzHVA6AZpMI_BhhJVcoA7jnIyrqAZ4mydp-0TUlDkhCkbN_M0"
);
export { messaging };