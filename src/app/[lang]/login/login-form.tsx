"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components";
import { UserCircle, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import { Dictionaries } from "@/lib/types";
import { LoginForm, loginFormSchema } from "./login-schema";
import { loginAction } from "./login-action";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  dictionaries: Dictionaries["login-page"];
}

export default function LoginForm({ dictionaries }: LoginFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);

  const toogleVisiblePassword = () => setVisiblePassword(prev => !prev)

  const passwordFieldProps = React.useMemo(() => {
    if (visiblePassword) {
      return {
        button: (
          <button
            type="button"
            onClick={toogleVisiblePassword}
          >
            <EyeOff />
          </button>
        ),
        type: "text",
      };
    }

    return {
      button: (
        <button
          type="button"
          onClick={toogleVisiblePassword}
        >
          <Eye />
        </button>
      ),
      type: "password",
    };
  }, [visiblePassword]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (values) => {
    startTransition(async () => {
      await loginAction(btoa(JSON.stringify(values)));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={dictionaries["your_email@mail.com"]}
                  prefixIcon={<UserCircle />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
          <label
            htmlFor="remember-me"
            className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {dictionaries["remember-me"]}
          </label>
        </div>

        <div className="w-full">
          <Button
            type="submit"
            className="w-full mt-6 flex gap-2"
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
