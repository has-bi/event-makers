import { Button } from "@heroui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center text-center px-6">
      <header className="w-full py-6 flex justify-between items-center px-10 bg-white shadow-md fixed top-0 left-0 right-0">
        <h1 className="text-2xl font-bold text-gray-900">EventMaker</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
          Login
        </button>
      </header>
      <main className="flex flex-col items-center mt-32">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6 max-w-2xl leading-tight">
          Create an Event Like Thanos Snap His Finger
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl">
          Setup an event page, invite a friends and sell tickets. Make an event
          like a pro here !
        </p>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white text-lg px-8 py-4 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
          Start Event
        </Button>
        <img
          src="/hero-image.png"
          alt="Mockup Image"
          className="mt-10 max-w-3xl w-full rounded-lg shadow-lg"
        />
      </main>
    </div>
  );
}
