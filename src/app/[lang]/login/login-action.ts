"use server";

import { cookies } from "next/headers";
import { LoginForm } from "./login-schema";
import { redirect } from "next/navigation";
import { MetaResponse } from "@/lib/types";

export interface LoginResponse extends MetaResponse {
  data: {
    refresh_token: string;
    access_token: string;
    is_vendor: boolean;
    finished_registration: boolean;
  };
}

export async function loginAction(payload: string) {
  const decodedBuffer = Buffer.from(payload, "base64");

  const data: LoginForm = JSON.parse(decodedBuffer.toString("utf-8"));

  const url = `${process.env.NEXT_PUBLIC_BASE_API}/admin/login`;

  const body = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, body);

  if (response.ok) {
    const responseJson: LoginResponse = await response.json();

    cookies().set("auth", JSON.stringify(responseJson.data), {
      httpOnly: true,
    });

    redirect("/");
  }

  return {
    error: "Email or password is wrong",
  };
}
