import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAccessToken = () => {
   const cookiesStore = cookies();

   const auth = cookiesStore.get("auth");

   if (!auth) {
      return redirect("/login");
   }

   const parseAuth = JSON.parse(auth.value);

   return parseAuth.access_token as string;
};

export const getRefreshToken = () => {
   const cookiesStore = cookies();

   const auth = cookiesStore.get("auth");

   if (!auth) {
      return redirect("/login");
   }

   const parseAuth = JSON.parse(auth.value);

   return parseAuth.refresh_token as string;
};
