import { addDays, format } from "date-fns";
import { Url } from "next/dist/shared/lib/router/router";

export const initialUserVerificationRoute: Url = {
   pathname: "/user-verification",
   query: {
      status: "1,2,3",
      end_date: format(new Date(), "yyyy-M-d"),
      start_date: format(addDays(new Date(), -30), "yyyy-M-d"),
   },
};
