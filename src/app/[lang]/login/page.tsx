import { getDictionary } from "@/lib/get-dictionary";
import { DictionaryProps } from "@/lib/types";
import Image from "next/image";
import LoginForm from "./login-form";

interface LoginPageProps extends DictionaryProps {}

export default async function LoginPage(props: LoginPageProps) {
   const { params } = props;

   const dictionaries = await getDictionary(params.lang).then((dic) => dic["login-page"]);

   return (
      <div className="w-full h-[100dvh] flex justify-center items-center">
         <div className="w-full flex flex-col items-center gap-8 px-2 md:w-[420px]">
            <Image src="/images/brand.svg" width={88} height={38} alt="brand" />

            <h1 className="text-2xl">{dictionaries["login-admin"]}</h1>

            <LoginForm dictionaries={dictionaries} />
         </div>
      </div>
   );
}
