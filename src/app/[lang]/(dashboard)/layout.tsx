import React from "react";
import { DictionaryProps } from "@/lib/types";
import { getDictionary } from "@/lib/get-dictionary";
import Sidebar from "./sidebar";
import Image from "next/image";
import MobileSidebar from "./mobile-sidebar";

interface DashboardProps extends React.PropsWithChildren, DictionaryProps {}

export default async function Dashboard(props: DashboardProps) {
  const { children, params } = props;

  const dictionaries = await getDictionary(params.lang);

  return (
    <main className="h-[100dvh] overflow-hidden flex flex-col md:flex-row">
      <header className="h-16 p-4 flex justify-between md:hidden">
        <Image src="/images/brand.svg" width={88} height={38} alt="brand" />

        <MobileSidebar dictionaries={dictionaries["sidebar"]}/>
      </header>
      <nav className="h-0 w-0 overflow-hidden transition-all shrink-0 md:w-72 md:h-full">
        <Sidebar dictionaries={dictionaries["sidebar"]} />
      </nav>

      <div className="h-full px-2 pb-2 grow overflow-y-auto">{children}</div>
    </main>
  );
}
