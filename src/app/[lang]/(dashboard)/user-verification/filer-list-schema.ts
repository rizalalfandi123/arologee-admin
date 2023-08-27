import { z } from "zod";

const filterStatusListSchema = z.enum(["0,1,2", "0", "1", "2"]);

export const filterListSchema = z.object({
  search: z.string(),
  status: filterStatusListSchema,
  date: z.object({
    to: z.date(),
    from: z.date(),
  }),
});

export type FilterUserVerification = z.infer<typeof filterListSchema>;

export type FilterStatusUserVerification = z.infer<
  typeof filterStatusListSchema
>;
