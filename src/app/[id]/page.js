import { prisma } from "@/utils/prisma";
import { MapPinned } from "lucide-react";
import moment from "moment";
import React from "react";

export default async function Page({ params }) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: { attendees: true }, //Take user sign from event
  });

  if (!event) {
    return <div>Event not found !</div>;
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full flex text-black">
        {/* Image taken from Database */}
        <div className="w-1/3 h-40 bg-gray-300 rounded-lg mr-4">
          {event.image}
        </div>
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">{event.title}</h1>

          {/* Date and Time from Database */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex">
              <div>
                <h3 className="font-bold">Start Date</h3>
                <p>{moment(event.startDatetime).format("ddd, MMM YYYY")}</p>
                <p>{moment(event.startDatetime).format("hh:mm a")}</p>
              </div>
              <div>
                <h3 className="font-bold ml-4">End Date</h3>
                <p>{moment(event.endDatetime).format("ddd, MMM YYYY")}</p>
                <p>{moment(event.endDatetime).format("hh:mm a")}</p>
              </div>
            </div>
          </div>

          {/* Pin icon and location from Database */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="bg-gray-200 p-2 rounded-full">
              <MapPinned size={16} />
            </div>
            <div>
              <p>{event.location}</p>
              <p>Indonesia</p>
            </div>
          </div>

          {/* Event description from Database */}
          <div className="mt-4">
            <h3 className="font-semibold">About Event</h3>
            <p>{event.description}</p>
          </div>

          {/* attendees from Database */}
          <div className="mt-4">
            <h3 className="font-semibold">Attendees</h3>
            {event.attendees.length > 0 ? (
              <ul className="list-disc pl-5">
                {event.attendees.map((attendee) => (
                  <li key={attendee.id}>{attendee.name}</li>
                ))}
              </ul>
            ) : (
              <p>No attendees yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
