import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyANNP7B3VJD1OXBYypkk5040H2_VDj6WHc",
    authDomain: "crwn-db-9bbd1.firebaseapp.com",
    databaseURL: "https://crwn-db-9bbd1.firebaseio.com",
    projectId: "crwn-db-9bbd1",
    storageBucket: "crwn-db-9bbd1.appspot.com",
    messagingSenderId: "444819101696",
    appId: "1:444819101696:web:13cd6e01236e9d5f3a20e5",
    measurementId: "G-YNGFSRSBLL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();
    
    if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message)
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;