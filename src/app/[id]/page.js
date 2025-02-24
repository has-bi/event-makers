import { prisma } from "@/utils/prisma";
import { MapPinned, CalendarIcon, UserPlusIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

export default async function Page({ params }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          user: true, // Include user data if you need participant names
        },
      },
      creator: true, // Include creator data if needed
    },
  });

  if (!event) {
    return <div className="text-gray-800">Event not found!</div>;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
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
              {moment(event.startDatetime).format("Do")} -
              {moment(event.endDatetime).format("Do MMMM, YYYY")}
            </p>
            <p>
              {moment(event.startDatetime).format("hh:mm a")} -
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
            <p>No participant yet.</p>
          )}
        </section>

        {/* Register Button */}
        <Link href={`/register/${event.id}`}></Link>
        <Button
          color="primary"
          className="w-full flex justify-center items-center gap-2 px-6 py-3 text-medium"
        >
          <UserPlusIcon size={20} /> Register to Event
        </Button>
      </div>
    </main>
  );
}
