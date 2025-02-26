"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEventAction } from "./updateEventAction"; // or inline server action

export default function EditEventForm({ event }) {
  const router = useRouter();

  // Initialize state with existing event data
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [startDatetime, setStartDatetime] = useState(event.startDatetime);
  const [endDatetime, setEndDatetime] = useState(event.endDatetime);
  const [location, setLocation] = useState(event.location);
  const [capacity, setCapacity] = useState(event.capacity);
  const [status, setStatus] = useState(event.status || "OPEN");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  // Form submission via server action
  async function handleSubmit(formData) {
    setPending(true);
    setError(null);

    try {
      // We can pass all fields in the FormData to the server action
      formData.append("eventId", event.id);
      await updateEventAction(formData);
      router.push("/events"); // or router.refresh() if you want to stay on the same page
    } catch (err) {
      console.error(err);
      setError("Failed to update event");
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          name="title"
          type="text"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          className="border p-2 w-full"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Start Date/Time</label>
          <input
            name="startDatetime"
            type="datetime-local"
            className="border p-2 w-full"
            value={startDatetime?.slice(0, 16)}
            onChange={(e) => setStartDatetime(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-semibold">End Date/Time</label>
          <input
            name="endDatetime"
            type="datetime-local"
            className="border p-2 w-full"
            value={endDatetime?.slice(0, 16)}
            onChange={(e) => setEndDatetime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Location</label>
        <input
          name="location"
          type="text"
          className="border p-2 w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Capacity</label>
        <input
          name="capacity"
          type="number"
          className="border p-2 w-full"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Status</label>
        <select
          name="status"
          className="border p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {pending ? "Updating..." : "Update Event"}
      </button>
    </form>
  );
}
