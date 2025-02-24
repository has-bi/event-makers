import { prisma } from "@/utils/prisma";
import { FormUpdate } from "./_components/form-update";
import { user } from "@heroui/react";

export default async function EditPage(params) {
  const { id } = await params;

  const todo = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return (
    <FormUpdate
      id={user.id}
      name={user.name}
      email={user.email}
      password={user.password}
    />
  );
}
