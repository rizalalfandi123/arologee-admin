"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Button, ButtonProps } from "@/components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn, normalizePathname } from "@/lib/utlis";

export interface ISidebarItemWithoutChildren {
  label: string;
  icon: React.ReactNode;
  pathname: string;
}

export interface ISidebarItemWithChildren {
  label: string;
  icon: React.ReactNode;
  children: ISidebarItemWithoutChildren[];
}

export type ISidebarItem =
  | ISidebarItemWithChildren
  | ISidebarItemWithoutChildren;

type SidebarItemProps = {} & ISidebarItem;

function isSidebarWithChildren(
  item: SidebarItemProps
): item is ISidebarItemWithChildren {
  return !Boolean((item as ISidebarItemWithoutChildren).pathname);
}

export default function SidebarItem(props: SidebarItemProps) {
  const currentPathname = usePathname();

  const withChildren = isSidebarWithChildren(props);

  const isActive = React.useMemo(() => {
    const normalPathname = normalizePathname(currentPathname)

    if (withChildren) {
      return props.children.some((child) => child.pathname === normalPathname);
    }

    return props.pathname === normalPathname;
  }, [currentPathname]);

  return (
    <>
      {withChildren ? (
        <SidebarButtonWithChildren {...props} isActive={isActive} />
      ) : (
        <SidebarButton {...props} isActive={isActive} />
      )}
    </>
  );
}

const SidebarButton: React.FunctionComponent<
  ISidebarItemWithoutChildren & { isActive: boolean } & ButtonProps
> = (props) => {
  const { label, icon, pathname, isActive, className, ...buttonProps } = props;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn([
        "w-full flex gap-4 justify-start",
        { "bg-[#1D1D1F]": isActive },
        className,
      ])}
      {...buttonProps}
    >
      <Link href={pathname} prefetch>
        {icon} {label}
      </Link>
    </Button>
  );
};

const SidebarButtonWithChildren: React.FunctionComponent<
  ISidebarItemWithChildren & { isActive: boolean }
> = (props) => {
  const { label, icon, isActive, children } = props;

  const [isExpand, setIsExpand] = React.useState<boolean>(true);

  const currentPathname = usePathname();

  const toggleExpand = () => setIsExpand((prev) => !prev);

  return (
    <>
      <Button
        variant="ghost"
        className={cn([
          "w-full flex justify-between",
          { "bg-[#1D1D1F]": isActive && !isExpand },
        ])}
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
        className={cn(["w-[100%-20px] ml-10 space-y-3", { hidden: !isExpand }])}
      >
        {children.map((item) => {
          return (
            <SidebarButton {...item} key={item.label} isActive={normalizePathname(currentPathname) === item.pathname} />
          );
        })}
      </div>
    </>
  );
};
