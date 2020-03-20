import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAgh6oJsQpqk_IwUUORcOBgf6JzymNC9I0",
    authDomain: "organizer-2838a.firebaseapp.com",
    databaseURL: "https://organizer-2838a.firebaseio.com",
    projectId: "organizer-2838a",
    storageBucket: "organizer-2838a.appspot.com",
    messagingSenderId: "5471664420",
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;