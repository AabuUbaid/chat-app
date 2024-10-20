
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA5I5c4WoQTjbAO0NL8InSUHc7fdsmbLgs",
  authDomain: "chat-app-au.firebaseapp.com",
  projectId: "chat-app-au",
  storageBucket: "chat-app-au.appspot.com",
  messagingSenderId: "421875870847",
  appId: "1:421875870847:web:bb4b9b5a56015da49d234a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There im using chat app",
            lastSeen:Date.now(),
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email,password) =>{
    try {
      await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  }

  const logout = async () =>{
    try{
        await signOut(auth);
    }
    catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
  }

export{signup,login,logout,auth,db}