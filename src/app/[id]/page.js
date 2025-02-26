// app/[id]/page.js
import React from "react";
import moment from "moment";
import { MapPinned, CalendarIcon } from "lucide-react";
import { prisma } from "@/utils/prisma";
import Layout from "@/app/components/layout/Layout";
import { cookies } from "next/headers";

import RegisterButton from "./RegisterButton"; // Client component for registration

export default async function EventDetailsPage(context) {
  // 1) Await params
  const { params } = context;
  const resolvedParams = await params; // new step
  const { id } = resolvedParams;

  // 2) Fetch the event (plus participants if needed)
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      participants: {
        include: { user: true },
      },
      creator: true,
    },
  });

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow">
          <h1 className="text-xl font-semibold text-gray-800">
            Event not found!
          </h1>
        </div>
      </div>
    );
  }

  // 3) Await cookies()
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  // If you need to find the logged-in user:
  let user = null;
  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (session) {
      user = await prisma.user.findUnique({ where: { id: session.userId } });
    }
  }

  // Example: check if user is already registered
  let isUserRegistered = false;
  if (user) {
    isUserRegistered = event.participants.some((p) => p.user?.id === user.id);
  }

  return (
    <Layout>
      <main className="flex justify-center items-start min-h-screen p-6">
        <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6">
          {/* Event Image */}
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 rounded-lg mb-6"></div>
          )}

          <h1 className="text-2xl font-bold text-center mb-4">{event.title}</h1>

          {/* Date and Time */}
          <section className="flex gap-4 items-center mb-4">
            <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-gray-100">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p>
                {moment(event.startDatetime).format("Do")} -{" "}
                {moment(event.endDatetime).format("Do MMMM, YYYY")}
              </p>
              <p>
                {moment(event.startDatetime).format("hh:mm a")} -{" "}
                {moment(event.endDatetime).format("hh:mm a")}
              </p>
            </div>
          </section>

          {/* Location */}
          <section className="flex gap-4 items-center mb-4">
            <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-gray-100">
              <MapPinned size={20} />
            </div>
            <div>
              <p>{event.location}</p>
              <p>Indonesia</p>
            </div>
          </section>

          {/* About Event */}
          <section className="mb-4">
            <h3 className="font-semibold">About Event</h3>
            <p>{event.description}</p>
          </section>

          {/* Participants */}
          <section className="mb-4">
            <h3 className="font-semibold">Participants</h3>
            {event.participants.length > 0 ? (
              <ul className="list-disc pl-5">
                {event.participants.map((participant) => (
                  <li key={participant.id}>{participant.user.name}</li>
                ))}
              </ul>
            ) : (
              <p>No participants yet.</p>
            )}
          </section>

          {/* Register Button or "You have registered" */}
          <RegisterButton eventId={id} isUserRegistered={isUserRegistered} />
        </div>
      </main>
    </Layout>
  );
}
