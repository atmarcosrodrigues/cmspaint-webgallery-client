// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { authMock } from './mockFireBase';

//load environment mode
const environment_mode = process.env.NODE_ENV;

// App Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let auth: firebase.auth.Auth;

// if is in test environment_mode load mock firebase
if (environment_mode === 'test'){  
  // @ts-ignore
  auth = authMock;
}else {
  // if is in the development/production environment load firebase auth 
   auth = firebase.auth();
}

const database = firebase.database();

export { firebase, auth, database }