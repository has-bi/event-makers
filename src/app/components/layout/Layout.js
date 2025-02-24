"use client";

import { Button } from "@heroui/button";
import Image from "next/image";
import { useState } from "react";
import { CalendarIcon, EyeIcon } from "@heroicons/react/24/outline";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> 6e5ef8f (feat: set up the route.js for fetching data)

export default function Layout({ children }) {
  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side : Logo, Brand, and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <a className="text-2xl font-bold text-indigo-500">
                  EventMakers.
                </a>
              </div>

              {/* Navigation Menu */}
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="/events"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-1 py-2"
                >
                  <CalendarIcon className="w-5 h-5" />
                  <span className="font-medium">Events</span>
                </a>
                <a
                  href="/discover"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-1 py-2"
                >
                  <EyeIcon className="w-5 h-5" />
                  <span className="font-medium">Discover</span>
                </a>
              </div>
            </div>

            {/* Right Side: Time, Create Event, Version, and Avatar */}
            <div className="flex items-center space-x-6">
              <div className="text-gray-600">{getCurrentTime()}</div>

<<<<<<< HEAD
              <Link href="/events/create">
                <Button color="default" variant="light">
                  Create Event
                </Button>
              </Link>
=======
              <Button color="default" variant="light">
                Create Event
              </Button>
>>>>>>> 6e5ef8f (feat: set up the route.js for fetching data)

              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            © 2025 EventMakers.
          </div>
          <div className="text-center text-sm text-gray-500">
            Created by Drakonx Team
          </div>
        </div>
      </footer>
    </div>
  );
}
