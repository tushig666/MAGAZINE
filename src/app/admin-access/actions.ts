"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const ADMIN_PASSCODE = "1234567890";
const SESSION_COOKIE_NAME = "admin-session";

export async function verifyPasscode(formData: FormData) {
  const passcode = formData.get("passcode");

  if (passcode === ADMIN_PASSCODE) {
    cookies().set(SESSION_COOKIE_NAME, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    redirect("/admin");
  } else {
    // In a real app, you'd want to show an error message.
    // For simplicity, we just redirect back.
    redirect("/admin-access");
  }
}

export async function logout() {
  cookies().delete(SESSION_COOKIE_NAME);
  revalidatePath("/");
  redirect("/");
}
