// /app/api/events/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    console.log("Starting POST request handling");

    // 1) Parse request body
    const data = await request.json();

    console.log("Received data:", data);

    // 2) Validate required fields
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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3) Retrieve session cookie (asynchronously)
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      console.log("No session cookie found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 4) Look up session and user
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      console.log("Invalid session ID");
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });
    if (!user) {
      console.log("User not found for session:", sessionId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 5) Create the event with a valid user ID
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
        creatorId: user.id, // must match a real User.id
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

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);

    if (error.code) {
      console.error("Prisma error code:", error.code);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch events",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
