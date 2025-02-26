"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateEventAction(formData) {
  // 1) Extract fields
  const eventId = formData.get("eventId");
  const title = formData.get("title");
  const description = formData.get("description");
  const startDatetime = formData.get("startDatetime");
  const endDatetime = formData.get("endDatetime");
  const location = formData.get("location");
  const capacity = parseInt(formData.get("capacity"));
  const status = formData.get("status") || "OPEN";

  // 2) Get user session
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    redirect("/login");
  }

  // 3) Check event ownership
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    redirect("/events");
  }
  if (event.creatorId !== user.id) {
    redirect("/events");
  }

  // 4) Update the event
  await prisma.event.update({
    where: { id: eventId },
    data: {
      title,
      description,
      startDatetime: new Date(startDatetime),
      endDatetime: new Date(endDatetime),
      location,
      capacity,
      status,
    },
  });
}
