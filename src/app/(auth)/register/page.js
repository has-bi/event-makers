"use client";

import { useActionState } from "react";
import { registerAction } from "./registerAction";
import { Button, Input } from "@heroui/react";
import Link from "next/link";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <main className="space-y-5 px-3 pb-3">
      <section className="text-center">
        <h3 className="font-semibold text-lg">Register</h3>
        <p className="text-sm">Create an account and start to join event</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input name="name" placeholder="Fullname" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
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
        <p>
          Have an account ?{" "}
          <Link className="text-blue-700" href="/login">
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
