import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventForm from "./CreateEventForm";

export default async function CreateEventPage() {
  // 1) Check user session
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    redirect("/login");
  }

  // 2) Possibly fetch user or do other checks
  // e.g. ensure user is valid
  // Then render the form
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <CreateEventForm />
    </main>
  );
}
