"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      success: false,
      errorMessage: "All fields are required",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      errorMessage: "User not found",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      errorMessage: "Invalid Password",
    };
  }

<<<<<<< HEAD
  let currentDate = new Date();
  let newDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
      expires: newDate,
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  redirect("/discover");
=======
  redirect("/");
>>>>>>> 34f9984 (register and login)
}
