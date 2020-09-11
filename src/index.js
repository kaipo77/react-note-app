import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHWQKKOfztwoqGV4sAhKVcL1jDUNwLHmI",
  authDomain: "evernote-clone-ee74d.firebaseapp.com",
  databaseURL: "https://evernote-clone-ee74d.firebaseio.com",
  projectId: "evernote-clone-ee74d",
  storageBucket: "evernote-clone-ee74d.appspot.com",
  messagingSenderId: "1069799110474",
  appId: "1:1069799110474:web:53e2be4da9196724f0b3b3",
  measurementId: "G-M2ZL8FQ2CM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
