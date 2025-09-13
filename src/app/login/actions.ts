"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: { error: string } | undefined, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // WARNING: This is a basic, insecure hardcoded login for demonstration.
  // In a real application, use a secure authentication provider.
  if (email === "admin@example.com" && password === "password") {
    const session = {
      isLoggedIn: true,
      email: "admin@example.com",
      role: "admin",
    };
    
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    
    // Redirect must be called after setting the cookie.
    return redirect("/admin");
  }

  return { error: "Invalid email or password." };
}

export async function logout() {
  cookies().delete("session");
  redirect("/login");
}
