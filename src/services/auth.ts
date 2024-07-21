import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
  } from 'firebase/auth';
  import { app } from './firebase'; // Ensure 'app' is your Firebase app instance
  
  export const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  export const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  export const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  
  export const logoutUser = () => {
    return signOut(auth);
  };
  