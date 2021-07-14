import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDk2rlj99Nab0XwCN3C52e6wY3YtTNG4Zk',
  authDomain: 'mini-olx-app.firebaseapp.com',
  projectId: 'mini-olx-app',
  storageBucket: 'mini-olx-app.appspot.com',
  messagingSenderId: '922092000609',
  appId: '1:922092000609:web:f7a2b3efa19660cac7a120',
  measurementId: 'G-P1FT4N32PF',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const firebaseStorage = firebase.storage();

const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const logIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export { registerUser, auth, logIn, db, firebaseStorage };
