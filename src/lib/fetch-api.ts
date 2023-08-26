import { getAccessToken, getRefreshToken } from "./get-auth-token";
import { LoginResponse } from "./types";
import { redirect } from "next/navigation";

interface FetchApiOptions {
  method: "POST" | "GET";
}

export async function fetchApi<Response>(
  endpoint: string,
  options: FetchApiOptions,
  accessToken?: string
) {
  const token = getAccessToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}${endpoint}`, {
    method: options.method,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : `Bearer ${token}`,
    },
  });

  let resJson = await res.json();

  if (!res.ok && resJson.meta.code === 401) {
    const newAccessToken = await refreshToken();

    return fetchApi(endpoint, options, newAccessToken.data.access_token);
  }

  return resJson as Response;
}

export async function refreshToken() {
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

    return resJson;
  } else {
    return redirect("/login");
  }
}
