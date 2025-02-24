import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  try {
    const data = await request.json();

    const event = await prisma.event.create({
      data: {
        ...data,
        creatorId: "user-id", // We'll implement auth later
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Error creating event" },
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

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}
