"use server";

import * as arctic from "arctic";
import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function countinueWithGoogleAction(_, formData) {
  const cookieStore = await cookies();
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
<<<<<<< HEAD
  const scopes = ["openid", "profile", "email"];

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
=======
  const scopes = ["openid", "profile"];

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
>>>>>>> 34f9984 (register and login)
  });

  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  redirect(url.href);
}
