import React from "react";
import { DictionaryProps } from "@/lib/types";
import { getDictionary } from "@/lib/get-dictionary";
import Sidebar from "./sidebar";


interface DashboardProps extends React.PropsWithChildren, DictionaryProps {}

export default async function Dashboard(props: DashboardProps) {
  const { children, params } = props;

  const dictionaries = await getDictionary(params.lang);

  return (
    <main className="h-[100dvh] overflow-hidden flex">
      <nav className="h-full w-64 shrink-0">
        <React.Suspense>
          <Sidebar dictionaries={dictionaries["sidebar"]} />
        </React.Suspense>
      </nav>

      <div className="h-full grow overflow-y-auto">{children}</div>
    </main>
  );
}
