"use client";

import { deleteEventAction } from "./deleteEventAction";

export default function DeleteEventButton({ eventId }) {
  return (
    <form action={deleteEventAction}>
      {/* Hidden input so the server action knows which event to delete */}
      <input type="hidden" name="eventId" value={eventId} />
      <button
        type="submit"
        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
      >
        Delete
      </button>
    </form>
  );
}
