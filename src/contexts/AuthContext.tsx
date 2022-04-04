import { ReactNode, createContext, useState, useEffect } from "react";
import { auth, firebase } from '../services/firebase';
import { useNavigate } from "react-router-dom";

type Status = {
  logged: boolean;
  message: string; 
}

type User = {
  id: string;
  name: string;
  avatar: string;  
}

type AuthContextType = {
  user: User | undefined,
  status: Status | undefined;
  signIn: () => Promise<void>;  
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);






export function AuthContextProvider(props: AuthContextProviderProps) {
    
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<Status>({ logged: false, message: "User not logged"});
    
  const navigate = useNavigate();
    
    useEffect(()=> {
      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log('trying signIn')
        if (user){
          const { displayName, photoURL, uid} = user;
          if (!displayName || !photoURL) {
            throw new Error('Google account missing information');
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL  
          })
          setStatus({
            logged: true,
            message: "User logged with google"
          });
        }else {          
          navigate('/login');
      
    
        }  
      })
    
      return () => {
        unsubscribe();    
      }
    
    }, []);
    
    
    async function signIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
        
        console.log('trying singin')
        
        if (result.user){
          const { displayName, photoURL, uid } = result.user;
          console.log(displayName);    
    
          if (!displayName || !photoURL){
            throw new Error('Google account missing information');
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL  
          });
          setStatus({
            logged: true,
            message: "User logged with google"
          });
          
        } 
      
      }
    
    
    
    
    
    return (
        <AuthContext.Provider value= {{user, status, signIn}}>
            {props.children}
        </AuthContext.Provider>

);
}