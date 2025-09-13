"use server";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { cookies } from "next/headers";

async function getSession() {
  return cookies().get("firebase-session")?.value;
}

async function login(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    
    // Set cookie to expire in 1 day
    cookies().set("firebase-session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      maxAge: 60 * 60 * 24, 
    });
    
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw new Error("Login failed. Please check your credentials.");
  }
}

async function logout(): Promise<void> {
  try {
    await signOut(auth);
    cookies().delete("firebase-session");
  } catch (error) {
    console.error("Logout failed:", error);
    throw new Error("Logout failed.");
  }
}

export { getSession, login, logout };
