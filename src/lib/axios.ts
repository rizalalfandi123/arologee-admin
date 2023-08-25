import axios from "axios";
import Cookies from "js-cookie";
import type { LoginResponse } from "./types";

const getAccessToken = () => {
  const authCookie = Cookies.get("auth")!;

  const parseAuthCookie: LoginResponse["data"] = JSON.parse(authCookie);


  return parseAuthCookie.access_token;
};

const getRefreshToken = async () => {
  try {
    const res = await axios.get<LoginResponse>("/api/generate-access-token");

    const data = res.data.data;

    Cookies.set("auth", JSON.stringify(data));

    return data.access_token;
  } catch (error) {
    console.log(error);
  }
};

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((req) => {
  const accessToken = getAccessToken();
  req.headers.Authorization = `Bearer ${accessToken}`;

  return req;
});

http.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = await getRefreshToken();

      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

      return http(originalRequest);
    }
    return Promise.reject(error);
  }
);

export * from "axios";
export { http };
