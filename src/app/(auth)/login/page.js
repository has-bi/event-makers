"use client";

import { useActionState } from "react";
import { loginAction } from "./loginAction";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import OAuthButton from "../_components/OAuthButton";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="space-y-5 px-3 pb-3">
      <section className="text-center px-3">
        <h3 className="font-semibold text-lg">Login to your account</h3>
        <p className="text-sm">Welcome back! Please enter your details</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button
          type="submit"
          variant="solid"
          color="custome"
          fullWidth
          isLoading={pending}
          className="btn-primary"
        >
          Login
        </Button>
      </form>
      <OAuthButton />
      <section>
        <p>
          Don&apos;t have an account ?{" "}
          <Link className="text-blue-700" href="/register">
            Register
          </Link>
        </p>
      </section>
      {state?.success == false && (
        <div className="text-center text-rose-500 text-sm bg-rose-50 p-2 rounded-lg font-semibold tracking-tight pb-3">
          {state?.errorMessage}
        </div>
      )}
      {state?.success && (
        <div className="text-center text-emerald-500 text-sm bg-emerald-50 p-2 rounded-lg font-semibold tracking-tight pb-3">
          {state?.message}
        </div>
      )}
    </main>
  );
}
