
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import {initializeApp} from "firebase/app";



    const firebaseConfig = {

      apiKey: "AIzaSyB9htrun24p2KMWY3ck1O2QPBL0En9jcWE",
      authDomain: "digital-sphere-c5367.firebaseapp.com",   
      projectId: "digital-sphere-c5367",
      storageBucket: "digital-sphere-c5367.appspot.com",   
      messagingSenderId: "57420714688",   
      appId: "1:57420714688:web:118d5c458ab2c6dd7c1325"
    
    
      };
      



 const fire = firebase.initializeApp(firebaseConfig);

export default fire;


