import { prisma } from "@/utils/prisma";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import Link from "next/link";

export default async function EventList() {
  // 1. Fetch events directly from the DB (no "useEffect" needed).
  const events = await prisma.event.findMany();

  // 2. Format date
  function formatDate(startDatetime, endDatetime) {
    // same date logic
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-white/0 py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex justify-between items-center w-full">
                <p className="text-tiny uppercase font-bold text-default-500">
                  {formatDate(event.startDatetime, event.endDatetime)}
                </p>
                <span className="px-2 py-1 text-xs bg-blue-100 text-indigo-800 rounded-full hidden">
                  {event.status}
                </span>
              </div>
              <h4 className="font-bold text-large mt-2">{event.title}</h4>
              <small className="text-default-500">
                📍 {event.location} • 👥 {event.capacity} capacity
              </small>
            </CardHeader>

            <CardBody className="overflow-visible py-2">
              <Image
                alt="Event cover"
                className="object-cover rounded-xl"
                src={
                  event.image ||
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
                }
                width={400}
                height={200}
              />
              <div className="space-y-4">
                <p className="text-default-500 mt-4 line-clamp-2">
                  {event.description}
                </p>
                <Link href={`/${event.id}`}>
                  <Button
                    className="bg-indigo-500 text-white"
                    variant="solid"
                    fullWidth="true"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
