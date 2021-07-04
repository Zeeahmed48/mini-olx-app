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

const db = firebase.firestore();

const registerUser = (email, password, firstName, lastName) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const fullName = `${firstName} ${lastName}`;
      const user = userCredentials.user;
      db.collection('users')
        .doc(user.uid)
        .set({ email, firstName, lastName, fullName });
    })
    .catch((error) => {
      console.log('error===>', error.message);
    });
};

const logIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export { registerUser, logIn, db };
