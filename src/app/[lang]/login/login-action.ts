"use server";

import { cookies } from "next/headers";
import { LoginForm } from "./login-schema";
import { redirect } from "next/navigation";

export async function loginAction(payload: string) {
  const decodedBuffer = Buffer.from(payload, "base64");
  const data: LoginForm = JSON.parse(decodedBuffer.toString("utf-8"));

  if (data.email === "admin@gmail.com" && data.password === "adminadmin") {
    cookies().set("user", JSON.stringify(data), { httpOnly: true });
    return redirect("/");
  }

  return {
    error: 'Slah'
  };
}
