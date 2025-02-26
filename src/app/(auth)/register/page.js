"use client";

import { useActionState } from "react";
import { registerAction } from "./registerAction";
import { Button, Input } from "@heroui/react";
import Link from "next/link";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <main className="space-y-3 px-3 py-3">
      <section>
        <h3 className="font-bold text-lg">Register</h3>
        <p className="text-sm">Create an account and start to join event</p>
      </section>

      <form action={formAction} className="w-full max-w-xs">
        <div className="flex flex-col pb-3">
          <div className="py-1">
            <label>Full Name</label>
            <Input
              isRequired
              name="name"
              placeholder="Fullname"
              variant="bordered"
            />
          </div>
          <div className="py-1">
            <label>Email</label>
            <Input
              isRequired
              name="email"
              type="email"
              placeholder="Email"
              variant="bordered"
            />
          </div>
          <div className="py-1">
            <label>Password</label>
            <Input
              isRequired
              name="password"
              type="password"
              placeholder="Password"
              variant="bordered"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={pending}
          className="btn-primary"
        >
          Register
        </Button>
      </form>
      <section>
        <p className="text-sm">
          Have an account ?{" "}
          <Link className="font-semibold text-indigo-700" href="/login">
            Login
          </Link>
        </p>
      </section>
      {state?.success == false && (
        <div className="text-center text-rose-500 text-sm bg-rose-50 -2 rounded-lg font-semibold tracking-tight">
          {state?.errorMessage}
        </div>
      )}
      {state?.success && (
        <div className="text-center text-emerald-500 text-sm bg-emerald-50 p-2 rounded-lg font-semibold tracking-tight">
          {state?.message}
        </div>
      )}
    </main>
  );
}
