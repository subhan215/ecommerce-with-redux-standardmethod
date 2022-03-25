import firebaseConfig from "./config";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export {db}