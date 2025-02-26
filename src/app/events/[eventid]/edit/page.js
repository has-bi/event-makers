// app/events/[eventId]/edit/page.js
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditEventForm from "./EditEventForm";

export default async function EditEventPage({ params }) {
  // 1) Await params in Next.js 15.1.7
  const resolvedParams = await params;
  const eventId = resolvedParams.eventId;

  // 2) Check user session
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session) {
    redirect("/login");
  }

  // 3) Find user
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  if (!user) {
    redirect("/login");
  }

  // 4) Fetch the event
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });
  if (!event) {
    // Could redirect or show "Not Found"
    redirect("/events");
  }

  // 5) Check if user is the creator
  if (event.creatorId !== user.id) {
    // Not authorized
    redirect("/events");
  }

  // 6) Render the EditEventForm with existing event data
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <EditEventForm event={event} />
    </main>
  );
}
