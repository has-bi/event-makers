"use client";

import { useActionState } from "react";
import { registerAction } from "./registerAction";
<<<<<<< HEAD
import { Button, Input } from "@heroui/react";
<<<<<<< HEAD
<<<<<<< HEAD
import OAuthButton from "../_components/OAuthButton";
=======
>>>>>>> 34f9984 (register and login)
=======
import { Form, Button, Input } from "@heroui/react";
>>>>>>> 5fe41c0 (resolve hidden container in heroui)
import Link from "next/link";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <main className="space-y-5 px-3 pb-3">
      <section className="text-center">
        <h3 className="font-semibold text-lg">Register</h3>
        <p className="text-sm">Create an account and start to join event</p>
      </section>
<<<<<<< HEAD
      <form action={formAction} className="space-y-2">
        <Input name="name" placeholder="Fullname" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
>>>>>>> 34f9984 (register and login)
=======

      <Form onSubmit={formAction} className="space-y-2 w-full max-w-xs">
        <div className="flex flex-col gap-4">
          <Input
            isRequired
            name="name"
            label="Fullname"
            placeholder="Fullname"
            variant="bordered"
          />
          <Input
            isRequired
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            variant="bordered"
          />
          <Input
            isRequired
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            variant="bordered"
          />
        </div>
>>>>>>> 5fe41c0 (resolve hidden container in heroui)
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={pending}
          className="btn-primary"
        >
          Register
        </Button>
<<<<<<< HEAD
      </form>
<<<<<<< HEAD
<<<<<<< HEAD
      <OAuthButton />
      <section>
        <p className="text-sm">
          Have an account ?{" "}
          <Link className="font-semibold text-indigo-700" href="/login">
=======
=======
      </Form>
>>>>>>> 5fe41c0 (resolve hidden container in heroui)
      <section>
        <p>
          Have an account ?{" "}
          <Link className="text-blue-700" href="/login">
>>>>>>> 34f9984 (register and login)
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
