import "server-only";

import Image from "next/image";
import { Home, DollarSign, User2, Watch, MoreVerticalIcon } from "lucide-react";
import { type Dictionaries } from "@/lib/types";
import SidebarItem, { type ISidebarItem } from "./sidebar-item";
import UserOptions from "./user-options";

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
    <div className="bg-sidebar p-0 h-full flex flex-col justify-between w-full md:px-4 md:py-6">
      <div className="flex flex-col">
        <div className="w-full mb-6">
          <Image src="/images/brand.svg" width={88} height={38} alt="brand" />
        </div>

        <h3 className="text-sidebar-foreground mb-4">
          {dictionaries.settings}
        </h3>

        <div className="space-y-3">
          {sidebarItems.map((item) => {
            return <SidebarItem {...item} key={item.label} />;
          })}
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/images/avatar.png"
            className="rounded-full"
            alt="avatar"
            width={32}
            height={32}
          />

          <p>Mclaren Steve</p>
        </div>

        <UserOptions/>
      </div>
    </div>
  );
}
