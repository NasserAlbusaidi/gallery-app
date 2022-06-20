import { getApps, initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';



if(getApps().length < 1) {
initializeApp({
    apiKey: "AIzaSyC0XvtkUyyzPEgf8rKd90TzzuVpbsso42M",
    authDomain: "photo-a34fb.firebaseapp.com",
    databaseURL: "https://photo-a34fb-default-rtdb.firebaseio.com",
    projectId: "photo-a34fb",
    storageBucket: "photo-a34fb.appspot.com",
    messagingSenderId: "517719597228",
    appId: "1:517719597228:web:bf42a12b8a56b58c10ff09"
})
}

const db = getFirestore();
const storage = getStorage();



export {db, storage};