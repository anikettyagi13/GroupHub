import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/app"
import firebaseConfig from "./config";
// import { extra } from "./firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//TODO: convert to transactions wherever required.
//TODO: read firebase docs for read once & other data practices
const Firebase = {

  signUp:async(email,password,username)=>{
    await firebase.auth().createUserWithEmailAndPassword(email,password);
    const user = await firebase.auth().currentUser;
    user.updateProfile({
      displayName: username
    });
    await user.sendEmailVerification();
    return await firebase.auth().signOut();
  },

  login:async(email,password)=>{
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  }
};

export default Firebase;
