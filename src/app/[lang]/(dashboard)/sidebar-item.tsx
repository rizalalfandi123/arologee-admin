"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Button, ButtonProps } from "@/components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn, normalizePathname } from "@/lib/utlis";
import { Url } from "next/dist/shared/lib/router/router";

export interface ISidebarItemWithoutChildren {
   label: string;
   icon: React.ReactNode;
   pathname: Url;
}

export interface ISidebarItemWithChildren {
   label: string;
   icon: React.ReactNode;
   children: ISidebarItemWithoutChildren[];
}

export type ISidebarItem = ISidebarItemWithChildren | ISidebarItemWithoutChildren;

type SidebarItemProps = {} & ISidebarItem;

function isSidebarWithChildren(item: SidebarItemProps): item is ISidebarItemWithChildren {
   return !Boolean((item as ISidebarItemWithoutChildren).pathname);
}

export default function SidebarItem(props: SidebarItemProps) {
   const currentPathname = usePathname();

   const withChildren = isSidebarWithChildren(props);

   const isActive = React.useMemo(() => {
      const normalPathname = normalizePathname(currentPathname);

      if (withChildren) {
         return props.children.some((child) => child.pathname === normalPathname);
      }

      return props.pathname === normalPathname;
   }, [currentPathname]);

   return (
      <>{withChildren ? <SidebarButtonWithChildren {...props} isActive={isActive} /> : <SidebarButton {...props} isActive={isActive} />}</>
   );
}

const SidebarButton: React.FunctionComponent<ISidebarItemWithoutChildren & { isActive: boolean } & ButtonProps> = (props) => {
   const { label, icon, pathname, isActive, className, ...buttonProps } = props;

   return (
      <Button
         asChild
         variant="ghost"
         className={cn(["w-full hover:bg-background flex gap-4 justify-start transition-[margin] hover:ml-2", { "bg-background": isActive }, className])}
         {...buttonProps}
      >
         <Link href={pathname} as={pathname} prefetch>
            {icon} {label}
         </Link>
      </Button>
   );
};

const SidebarButtonWithChildren: React.FunctionComponent<ISidebarItemWithChildren & { isActive: boolean }> = (props) => {
   const { label, icon, isActive, children } = props;

   const [isExpand, setIsExpand] = React.useState<boolean>(true);

   const currentPathname = usePathname();

   const toggleExpand = () => setIsExpand((prev) => !prev);

   return (
      <>
         <Button
            variant="ghost"
            className={cn(["w-full flex justify-between transition-[margin] hover:ml-2 hover:bg-background", { "bg-background": isActive && !isExpand }])}
            onClick={toggleExpand}
         >
            <div className="flex gap-4 justify-start items-center">
               {icon} {label}
            </div>

            <ChevronDown
               className={cn("transition-all duration-500", {
                  "rotate-180": isExpand,
               })}
            />
         </Button>
         <div
            className={cn([
               "w-[100%-20px] h-[98px] overflow-hidden ml-10 space-y-3 transition-all duration-500 pr-2",
               { "h-0 my-[0px!important]": !isExpand },
            ])}
         >
            {children.map((item) => {
               return <SidebarButton {...item} key={item.label} isActive={normalizePathname(currentPathname) === item.pathname} />;
            })}
         </div>
      </>
   );
};
