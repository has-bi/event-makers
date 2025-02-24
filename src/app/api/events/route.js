// /api/events/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(request) {
  try {
    console.log("Starting POST request handling");

    const data = await request.json();
    console.log("Successfully parsed request data:", data);

    // Validation logging
    console.log("Validating fields...");
    const missingFields = [];
    if (!data.title) missingFields.push("title");
    if (!data.description) missingFields.push("description");
    if (!data.startDatetime) missingFields.push("startDatetime");
    if (!data.endDatetime) missingFields.push("endDatetime");
    if (!data.location) missingFields.push("location");
    if (!data.capacity) missingFields.push("capacity");

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      return NextResponse.json(
        { error: "Missing required fields", fields: missingFields },
        { status: 400 }
      );
    }

    console.log("All fields validated, attempting to create event");

    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startDatetime: new Date(data.startDatetime),
        endDatetime: new Date(data.endDatetime),
        location: data.location,
        capacity: parseInt(data.capacity),
        status: data.status || "OPEN",
        image: data.image,
        creatorId: "user-id",
      },
    });

    console.log("Event created successfully:", event);
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Detailed error information:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });

    if (error.code) {
      console.error("Prisma error code:", error.code);
    }

    return NextResponse.json(
      {
        error: "Failed to create event",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
