import React from "react";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteEventButton from "./DeleteEventButton"; // (Client component below)

export default async function MyEventsPage() {
  // 1) Check if user is logged in
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    // No session cookie → redirect to login
    redirect("/login");
  }

  // 2) Look up the session & user
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

  // 3) Fetch events belonging to this user (creatorId = user.id)
  const myEvents = await prisma.event.findMany({
    where: { creatorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>

      {myEvents.length === 0 ? (
        <p>You haven&apos;t created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {myEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
              <div className="mt-3 md:mt-0 flex items-center gap-2">
                {/* Edit Link */}
                <a
                  href={`/events/${event.id}/edit`}
                  className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Edit
                </a>
                {/* Delete Button (uses a server action) */}
                <DeleteEventButton eventId={event.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
