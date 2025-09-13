"use server";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { cookies } from "next/headers";

async function getSession() {
  return cookies().get("firebase-session")?.value;
}

async function login(email: string, password: string): Promise<void> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    cookies().set("firebase-session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error;
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
