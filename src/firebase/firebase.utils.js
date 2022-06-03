import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore/lite";

const config = {
  apiKey: "AIzaSyBpdKQnxCFH8hPGMnMbILnr7lSt_073htE",
  authDomain: "biblioteca-online-licenta.firebaseapp.com",
  projectId: "biblioteca-online-licenta",
  storageBucket: "biblioteca-online-licenta.appspot.com",
  messagingSenderId: "583797316598",
  appId: "1:583797316598:web:564c05a98301863f23c5d7",
};

export const createUserProfileDocumet = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, emailVerified } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        emailVerified,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creatung user", error.message);
    }
  } else {
    const { emailVerified } = userAuth;

    try {
      await userRef.update({

        emailVerified,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creatung user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = getFirestore(firebase.initializeApp(config));

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
