import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";

const formatDate = (startDatetime, endDatetime) => {
  // Conver strings to Date Object
  const start = new Date(startDatetime);
  const end = new Date(endDatetime);

  // Function to add ordinal suffix
  const addOrdinalSuffix = (day) => {
    // Convert to number to ensure proper handling
    const d = Number(day);
    if (d > 3 && d < 21) return d + "th";
    switch (d % 10) {
      case 1:
        return d + "st";
      case 2:
        return d + "nd";
      case 3:
        return d + "rd";
      default:
        return d + "th";
    }
  };

  // Format the date
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  // Same day
  if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
    return `${addOrdinalSuffix(startDay)}, ${start.toLocaleString("default", {
      month: "long",
    })} ${startYear}`;
  }

  // Same month and year
  if (startMonth === endMonth && startYear === endYear) {
    return `${addOrdinalSuffix(startDay)} - ${addOrdinalSuffix(
      endDay
    )}, ${start.toLocaleString("default", { month: "long" })} ${startYear}`;
  }
};

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
    {
      id: "3",
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
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Using placeholder for now
                width={400}
                height={200}
              />
              <div className="space-y-4">
                <p className="text-default-500 mt-4 line-clamp-2">
                  {event.description}
                </p>
                <Button
                  className="bg-indigo-500 text-white"
                  variant="solid"
                  fullWidth="true"
                >
                  View Details
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
