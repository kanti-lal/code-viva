import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile
} from 'firebase/auth';
// import app from '@/utils/firebase.util'
import { auth } from '@/utils/firebase.util';
import { NEXT_PUBLIC_RESET_PASSWORD_URL } from '@/utils/config';




const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  handleAuthError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // function register(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }

  async function register(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    return user;
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: NEXT_PUBLIC_RESET_PASSWORD_URL,
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }

  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();

    return signInWithPopup(auth, provider);
  }

  function changePassword(password) {
    if (auth.currentUser) {
      return updatePassword(auth.currentUser, password);
    }

    return Promise.reject(new Error('No hay ningún usuario actualmente conectado.'));
  }

  // const handleAuthError = (error) => {
  //   let errorMessage = 'An unexpected error occurred. Please try again later.';
  //   switch (error.code) {
  //     case 'auth/invalid-email':
  //       errorMessage = 'The email address is invalid.';
  //       break;
  //     case 'auth/user-disabled':
  //       errorMessage = 'The user associated with this email has been disabled.';
  //       break;
  //     case 'auth/user-not-found':
  //       errorMessage = 'No user found with this email address.';
  //       break;
  //     case 'auth/wrong-password':
  //       errorMessage = 'Wrong password. Please try again.';
  //       break;
  //     case 'auth/email-already-in-use':
  //       errorMessage = 'The email address is already in use by another account.';
  //       break;
  //     case 'auth/weak-password':
  //       errorMessage = 'The password is too weak.';
  //       break;
  //     case 'auth/cancelled-popup-request':
  //       errorMessage = 'This operation has been cancelled due to another conflicting popup being opened.';
  //       break;
  //     case 'auth/popup-closed-by-user':
  //       errorMessage = 'The popup was closed before finalizing the operation. Please try again.';
  //       break;
  //     case 'auth/invalid-login-credentials':
  //       errorMessage = 'User not found with this credentials';
  //       break;
  //     case 'auth/expired-action-code':
  //       errorMessage = 'The action code has expired. Please reset your password again.';
  //       break;
  //     case 'auth/invalid-action-code':
  //       errorMessage = 'The action code is invalid. Please check the link or request a new one.';
  //       break;
  //     case 'auth/too-many-requests':
  //       errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
  //       break;
  //     case 'auth/popup-blocked':
  //       errorMessage = 'The popup has been blocked by the browser. Make sure popups are allowed for this website.';
  //       break;
  //     case 'auth/account-exists-with-different-credential':
  //       errorMessage =
  //         'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.';
  //       break;
  //     // Add more cases as needed
  //     default:
  //       break;
  //   }

  //   return errorMessage;
  //   // You might want to replace this with a more user-friendly UI update
  // };

  const value = useMemo(() => {
    return {
      currentUser,
      signInWithGoogle,
      signInWithFacebook,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      changePassword,
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};