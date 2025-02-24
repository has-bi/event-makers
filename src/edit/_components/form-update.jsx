"use client";

import { Button } from "@heroui/button";
import { useActionState } from "react";
import { updateUserAction } from "../_actions/action-update";

export const FormUpdate = ({ id, name, email, password }) => {
  const [_, formAction, pending] = useActionState(updateUserAction, null);

  const [activeTab, setActiveTab] = useState("Personal Info");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">User Profile Management</h2>
        <nav>
          <ul className="space-y-3">
            {["Personal Info", "Events", "Participate"].map((item) => (
              <li
                key={item}
                className={`cursor-pointer font-medium p-2 rounded-md transition ${
                  activeTab === item
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Profile Form */}
      <main className="flex-1 p-10 bg-white shadow-md rounded-lg mx-6 my-6">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <form action={formAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-6">
            <input name="id" defaultValue={id} hidden />
            <input
              name="name"
              defaultValue={name}
              placeholder="Full Name"
              className="border p-3 w-full rounded-md"
            />
            <input
              name="email"
              defaultValue={email}
              placeholder="Email Address"
              className="border p-3 w-full rounded-md"
            />
            <input
              name="password"
              defaultValue={password}
              placeholder="Password"
              type="password"
              className="border p-3 w-full rounded-md"
            />
          </div>
          <Button color="warning" className="mt-4">
            Save Changes
          </Button>
        </form>
      </main>
    </div>
  );
};
