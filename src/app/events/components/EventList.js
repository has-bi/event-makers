import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function EventList() {
  // Dummy data for now
  const events = [
    {
      id: "1",
      title: "Tech Conference 2024",
      description:
        "Annual technology conference featuring the latest innovations",
      startDatetime: "2024-03-15T09:00",
      endDatetime: "2024-03-15T17:00",
      location: "Convention Center",
      capacity: 200,
      status: "OPEN",
    },
    {
      id: "2",
      title: "Community Meetup",
      description: "Monthly community gathering for tech enthusiasts",
      startDatetime: "2024-03-20T18:00",
      endDatetime: "2024-03-20T20:00",
      location: "Local Tech Hub",
      capacity: 50,
      status: "OPEN",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <div className="flex justify-between items-center w-full">
                <p className="text-tiny uppercase font-bold text-default-500">
                  {new Date(event.startDatetime).toLocaleDateString()}
                </p>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
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
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Using placeholder for now
                width={400}
                height={200}
              />
              <p className="text-default-500 mt-4 line-clamp-2">
                {event.description}
              </p>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
