"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components";
import { UserCircle, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import { Dictionaries, LoginResponse } from "@/lib/types";
import { LoginForm as ILoginForm, loginFormSchema } from "./login-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError, type AxiosResponse } from "@/lib/axios";
import { useRouter } from "next/navigation";
import getUnixTime from "date-fns/getUnixTime";
import axios from "axios";
import TextField from "@/components/form/text-field";

interface LoginFormProps {
   dictionaries: Dictionaries["login-page"];
}

export default function LoginForm({ dictionaries }: LoginFormProps) {
   const router = useRouter();

   const form = useForm<ILoginForm>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const { mutate: login, isLoading: loading } = useMutation<AxiosResponse<LoginResponse>, AxiosError<unknown>, ILoginForm>({
      mutationKey: ["LOGIN"],
      mutationFn: (data) => axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/admin/login`, data),
      onError: () => {
         form.setError("email", {
            message: dictionaries["incorrect-email-or-password"],
         });

         form.setError("password", {
            message: dictionaries["incorrect-email-or-password"],
         });
      },
      onSuccess: (response) => {
         Cookies.set("auth", JSON.stringify(response.data.data));

         const now = getUnixTime(new Date());

         Cookies.set("auth-last-update", now.toString());

         router.push("/");
      },
   });

   const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);

   const toogleVisiblePassword = () => setVisiblePassword((prev) => !prev);

   const passwordFieldProps = React.useMemo(() => {
      if (visiblePassword) {
         return {
            button: (
               <button type="button" onClick={toogleVisiblePassword}>
                  <EyeOff />
               </button>
            ),
            type: "text",
         };
      }

      return {
         button: (
            <button type="button" onClick={toogleVisiblePassword}>
               <Eye />
            </button>
         ),
         type: "password",
      };
   }, [visiblePassword]);

   const onSubmit: SubmitHandler<ILoginForm> = (values) => login(values);

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <TextField<ILoginForm>
               control={form.control}
               label="Email"
               name="email"
               placeholder={dictionaries["your_email@mail.com"]}
               prefixIcon={<UserCircle />}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input
                           placeholder={dictionaries.password_example}
                           prefixIcon={<Lock />}
                           type={passwordFieldProps.type}
                           suffixIcon={passwordFieldProps.button}
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="flex self-start items-center space-x-2">
               <Checkbox id="remember-me" />
               <label htmlFor="remember-me" className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {dictionaries["remember-me"]}
               </label>
            </div>

            <div className="w-full">
               <Button type="submit" className="w-full mt-6 flex gap-2" disabled={loading}>
                  {loading && <Loader2 className="animate-spin" />}
                  {loading ? "Loading" : "Submit"}
               </Button>
            </div>
         </form>
      </FormProvider>
   );
}
