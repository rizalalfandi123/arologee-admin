import { z } from "zod";

export const userVerificationSchema = z.object({
   username: z.string(),
   real_username: z.string().nonempty("harus di isi"),
});

export type UserVerificationForm = z.infer<typeof userVerificationSchema>;
