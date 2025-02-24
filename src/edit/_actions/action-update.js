"use server";

import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function updateUserAction(_, updateUser) {
  const id = updateUser.get("id");
  const name = updateUser.get("name");
  const email = updateUser.get("email");
  const password = updateUser.get("password");

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
    },
  });

  redirect("/");
}
