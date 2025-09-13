"use server";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@bitchesgonemaad.com";

async function getSession() {
  return cookies().get("firebase-session")?.value;
}

async function login(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    cookies().set("firebase-session", idToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error: any) {
    // Check if the error is that the user does not exist
    if (error.code === 'auth/user-not-found' && email === ADMIN_EMAIL) {
      console.log('Admin user not found. Creating a new admin user...');
      try {
        const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await newUserCredential.user.getIdToken();
         cookies().set("firebase-session", idToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });
      } catch (creationError) {
        console.error("Error creating new admin user:", creationError);
        throw creationError;
      }
    } else {
      console.error("Login failed:", error);
      throw error;
    }
  }
}

async function logout(): Promise<void> {
  try {
    await signOut(auth);
    cookies().delete("firebase-session");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

export { getSession, login, logout };
