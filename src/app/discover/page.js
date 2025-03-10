import EventList from "./components/EventList";
import { Button } from "@heroui/react";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-1 text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-2">Discover Events</h1>
        <p className="text-gray-400 mb-8">
          Explore popular events near you, browse category, or check out some of
          the greate community calenders.
        </p>

        {/* Popular Events Section */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">Popular Events</h2>
              <p className="text-gray-400">Jakarta</p>
            </div>
            <Button color="default" size="sm" variant="flat">
              View All →
            </Button>
          </div>
        </div>
      </div>
      <EventList />
    </main>
  );
}
