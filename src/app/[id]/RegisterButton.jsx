"use client";

import { registerAction } from "./registerAction";

export default function RegisterButton({ eventId, isUserRegistered }) {
  if (isUserRegistered) {
    return (
      <div className="mt-4 p-3 text-center bg-gray-200 text-gray-700 rounded">
        You have registered to this event
      </div>
    );
  }

  return (
    <form action={registerAction} className="mt-4">
      {/* Hidden input so the server action knows which event to register for */}
      <input type="hidden" name="eventId" value={eventId} />

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 px-6 py-3
                   bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Register to Event
      </button>
    </form>
  );
}
