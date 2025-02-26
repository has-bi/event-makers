"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteEventAction(formData) {
  // 1) Extract eventId from the form
  const eventId = formData.get("eventId");

  // 2) Check user session
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    redirect("/login");
  }

  // 3) Find user & event
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (!user) {
    redirect("/login");
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });
  if (!event) {
    // Or you could redirect with an error
    redirect("/events");
  }

  // 4) Ensure the user is the event's creator
  if (event.creatorId !== user.id) {
    // Not authorized to delete
    redirect("/events");
  }

  // 5) Delete the event
  await prisma.event.delete({
    where: { id: eventId },
  });

  // 6) Redirect back to /events
  redirect("/events");
}
