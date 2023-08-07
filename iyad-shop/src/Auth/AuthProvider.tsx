import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "./fierbase/fierbase.config";
import { createContext, useState, ReactNode, useEffect } from "react";
import React from "react";

export interface AuthProviderProps {
  children?: ReactNode;
}
export interface UserContextState {
  isAuthenticated: boolean;
  loading: boolean;
  id?: string;
}
export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
);

export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUser: (displayName: string, photoURL: string) => Promise<void>;
  googleLoge: () => Promise<UserCredential>;
}

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleLoge = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = async (
    displayName: string,
    photoURL: string
  ): Promise<void> => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        });
      } else {
        throw new Error("No user is currently authenticated.");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubsrcibe;
  }, []);

  const authInfo = {
    user,
    createUser,
    loading,
    auth,
    updateUser,
    signIn,
    googleLoge,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;