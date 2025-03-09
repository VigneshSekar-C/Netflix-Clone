
import { initializeApp } from "firebase/app";
import {    
    createUserWithEmailAndPassword, 
    getAuth,
    signInWithEmailAndPassword,    
    signOut
        } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA9KhNTT_bjuvRAu6P3mEl7hbl8_Abp4Wo",
  authDomain: "netflix-clone-8fbaa.firebaseapp.com",
  projectId: "netflix-clone-8fbaa",
  storageBucket: "netflix-clone-8fbaa.firebasestorage.app",
  messagingSenderId: "443815081578",
  appId: "1:443815081578:web:6fdb138fccdf2c9b9dbc13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc (collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };