"use server";

import { createUser } from "@/functions/createUser";
import { redirect } from "next/navigation";

export async function createUserAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const formID = formData.get("formID") as string;

  if (!email || !password || !formID) {
    throw new Error("Missing required fields");
  }

  const user = await createUser({ email, password, formID });

  if (user.error) {
    // In real code, handle error state (via cookies, revalidatePath, or redirect with state)
    throw new Error(user.error);
  }

  // Redirect after successful creation
  redirect(`/form/${formID}/user-created`);
}
