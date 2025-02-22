import { Button } from "@heroui/button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full py-6 flex justify-between items-center px-10 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <h1 className="text-2xl font-bold text-gray-900">EventMaker</h1>
        <Button
          color="primary"
          variant="bordered"
          className=" text-medium px-4 py-2 rounded-lg shadow-md"
        >
          Login
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-between max-w-7xl mx-auto pt-32 px-6 gap-12">
        {/* Left Column - Text and CTA */}
        <div className="flex-1 text-left">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Create an Event Like Thanos Snap His Finger
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Setup an event page, invite friends, and sell tickets. Make an event
            like a pro here!
          </p>
          <Button
            color="primary"
            variant="ghost"
            className="cursor-pointer font-extrabold px-4 py-2 rounded-lg shadow-md transform transition duration-300 hover:scale-110"
          >
            Start Event
          </Button>
        </div>

        {/* Right Column - Image */}
        <div className="flex-1 flex ml-auto pr-16">
          <img
            src="assets/snap_1.png"
            alt="image"
            className="w-full h-full rounded-full  ml-32"
          />
        </div>
      </main>
    </div>
  );
}
