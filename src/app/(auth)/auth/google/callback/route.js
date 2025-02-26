import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import * as arctic from "arctic";
import { redirect } from "next/navigation";

export async function GET(req) {
  const query = req.nextUrl.searchParams;
  const code = query.get("code");

  // console.log({ code });

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;
  // console.log({ codeVerifier });

  // // try {
  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  const accessToken = tokens.accessToken();

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  console.log({ data });
  // } catch (e) {
  //   if (e instanceof arctic.OAuth2RequestError) {
  //     const code = e.code;
  //   }
  //   if (e instanceof arctic.ArcticFetchError) {
  //     const cause = e.cause;
  //   }
  // }
}
