"use client";

import { FormProvider, useForm } from "react-hook-form";
import { UserVerificationForm, userVerificationSchema } from "./user-verification.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/form/text-field";
import { Button } from "@/components";
import { DetailUserVerificationResponse, UserVerficationResponse } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { http } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utlis";
import { useRouter } from "next/navigation";

interface FormUserVerificationProps {
   initialData: DetailUserVerificationResponse["data"];
}
interface UserVerificationPayload {
   user_id: number;
   name: string;
   is_verified: number;
}

export default function FormUserVerification(props: FormUserVerificationProps) {
   const router = useRouter();

   const [sameWithUsername, setSameWithUsername] = React.useState<boolean>(false);

   const { mutate: verifyUser, isLoading } = useMutation<AxiosResponse<UserVerficationResponse>, unknown, UserVerificationPayload>({
      mutationKey: ["USER_VERIFICATION"],
      mutationFn: (payload) => http.post<UserVerficationResponse>("/user/verify", payload),
   });

   const { mutate: rejectUser, isLoading: islOadingRejectUser } = useMutation<
      AxiosResponse<UserVerficationResponse>,
      unknown,
      UserVerificationPayload
   >({
      mutationKey: ["USER_REJECTION"],
      mutationFn: (payload) => http.post<UserVerficationResponse>("/user/verify", payload),
   });

   const form = useForm<UserVerificationForm>({
      resolver: zodResolver(userVerificationSchema),
      defaultValues: {
         username: props.initialData.name,
         real_username: "",
      },
   });

   const onSubmit = (data: UserVerificationForm) => {
      verifyUser({ is_verified: 3, name: data.real_username, user_id: props.initialData.id });
      router.refresh();
   };

   const handleRejectUser = () => {
      rejectUser({ is_verified: 2, name: props.initialData.name, user_id: props.initialData.id });
      router.refresh();
   };

   React.useEffect(() => {
      if (props.initialData.name === form.getValues("real_username") && !sameWithUsername) {
         setSameWithUsername(true);
      }

      if (form.getValues("username") !== form.getValues("real_username") && sameWithUsername) {
         setSameWithUsername(false);
      }
   }, [form.watch("real_username"), sameWithUsername]);

   const onCheckboxChange = (event: boolean) => {
      if (event) form.setValue("real_username", props.initialData.name);

      setSameWithUsername(event);
   };

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
            <div className="h-full py-4 flex flex-col justify-between">
               <div className="w-full space-y-4">
                  <TextField<UserVerificationForm> control={form.control} label="Nama Pengguna" name="username" disabled />

                  <TextField<UserVerificationForm>
                     control={form.control}
                     label="Nama Sesuai Kartu Identitas"
                     name="real_username"
                     containerProps={{ className: cn({ hidden: props.initialData.is_verified !== 1 }) }}
                  />

                  <div className={cn("flex self-start items-center space-x-2", { hidden: props.initialData.is_verified !== 1 })}>
                     <Checkbox
                        id="same-with-username"
                        defaultChecked={false}
                        checked={sameWithUsername}
                        onCheckedChange={onCheckboxChange}
                        className="rounded-full w-5 h-5"
                     />
                     <label htmlFor="same-with-username" className="text-sm">
                        Samakan dengan Nama Pengguna
                     </label>
                  </div>
               </div>

               <div className="flex w-full gap-2">
                  <Button type="button" variant="netral-outline" className="basis-1/2 flex gap-2" onClick={handleRejectUser}>
                     {islOadingRejectUser && <Loader2 className="animate-spin" />}
                     {islOadingRejectUser ? "Loading" : "Tolak"}
                  </Button>
                  <Button type="submit" variant="destructive-outline" disabled={isLoading} className="basis-1/2 flex gap-2">
                     {isLoading && <Loader2 className="animate-spin" />}
                     {isLoading ? "Loading" : "Verifikasi"}
                  </Button>
               </div>
            </div>
         </form>
      </FormProvider>
   );
}
