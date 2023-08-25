import { getRefreshToken } from "@/lib/get-auth-token";
import { LoginResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = getRefreshToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/user/generate-access-token`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  
  if (res.ok) {
    const resJson: LoginResponse = await res.json();

    request.cookies.set("auth", JSON.stringify(resJson.data));
    return NextResponse.json(resJson);
  } else {
    return redirect("/login");
  }
}
