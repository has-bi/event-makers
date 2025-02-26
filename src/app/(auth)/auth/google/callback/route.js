import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import * as arctic from "arctic";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";

export async function GET(req) {
  const query = req.nextUrl.searchParams;
  const code = query.get("code");

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  const accessToken = tokens.accessToken();

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userData = await res.json();

  //  check if existing user or not
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  let currentDate = new Date();
  let newDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        googleId: userData.sub,
      },
    });

    const session = await prisma.session.create({
      data: {
        userId: newUser.id,
        expires: newDate,
      },
    });

    cookies().set("sessionId", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    redirect("/discover");
  }

  // if exist
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expires: newDate,
    },
  });

  cookies().set("sessionId", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  redirect("/discover");
}
