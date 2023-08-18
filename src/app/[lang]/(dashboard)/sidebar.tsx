import "server-only";

import Image from "next/image";
import { ChevronsLeft, Home, DollarSign, User2, Watch } from "lucide-react";
import { type Dictionaries } from "@/lib/types";
import SidebarItem, { type ISidebarItem } from "./sidebar-item";

interface SidebarProps {
  dictionaries: Dictionaries["sidebar"];
}

export default function Sidebar(props: SidebarProps) {
  const { dictionaries } = props;

  const sidebarItems: Array<ISidebarItem> = [
    {
      icon: <Home />,
      label: dictionaries.dashboard,
      pathname: "/",
    },
    {
      icon: <DollarSign />,
      label: dictionaries.finance,
      pathname: "/finance",
    },
    {
      icon: <User2 />,
      label: dictionaries.user,
      children: [
        {
          icon: null,
          label: dictionaries["user-verification"],
          pathname: "/user-verification",
        },
        {
          icon: null,
          label: dictionaries["user-list"],
          pathname: "/user-list",
        },
      ],
    },

    {
      icon: <Watch />,
      label: dictionaries.watch,
      pathname: "/watch",
    },
  ];

  return (
    <div className="w-full px-6 py-8 bg-sidebar h-full">
      <div className="w-full flex justify-between items-center mb-6">
        <Image src="/images/brand.svg" width={88} height={38} alt="brand" />

        <ChevronsLeft />
      </div>

      <h3 className="text-sidebar-foreground mb-4">{dictionaries.settings}</h3>

      <div className="space-y-3">
        {sidebarItems.map((item) => {
          return <SidebarItem {...item} key={item.label} />;
        })}
      </div>
    </div>
  );
}
