"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(formData) {
  try {
    // 1) Parse eventId from the form
    const eventId = formData.get("eventId");

    // 2) Get session from cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    if (!sessionId) {
      // Not logged in; redirect to login or handle as you wish
      redirect("/login");
    }

    // 3) Validate session & find user
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      redirect("/login");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });
    if (!user) {
      redirect("/login");
    }

    // 4) Create the participant record
    // (Check if participant already exists to avoid duplicates)
    await prisma.participant.create({
      data: {
        eventId,
        userId: user.id,
        status: "GOING", // or any status your schema expects
      },
    });

    // 5) Redirect back to the event page
    redirect(`/${eventId}`);
  } catch (error) {
    console.error("Registration error:", error);
    // Optionally, redirect with an error query param or handle it differently
    redirect(
      `/${formData.get("eventId")}?error=${encodeURIComponent(error.message)}`
    );
  }
}
