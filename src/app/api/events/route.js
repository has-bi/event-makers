// /api/events/route.js
// /api/events/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function POST(request) {
  try {
    console.log("Starting POST request handling");

    const data = await request.json();

    console.log("Received data:", data);

    // Validate required fields
    if (
      !data.title ||
      !data.description ||
      !data.startDatetime ||
      !data.endDatetime ||
      !data.location ||
      !data.capacity
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startDatetime: new Date(data.startDatetime),
        endDatetime: new Date(data.endDatetime),
        location: data.location,
        capacity: parseInt(data.capacity),
        status: data.status || "OPEN",
        image: data.image || null,
        creatorId: "user-id", // Temporary until auth is implemented
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    // Fixed the syntax error in the error response
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        creator: true,
        participants: true,
      },
      orderBy: {
        startDatetime: "asc",
      },
    });

    if (error.code) {
      console.error("Prisma error code:", error.code);
    }

    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}
