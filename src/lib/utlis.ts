import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Cn = (...inputs: ClassValue[]) => string;

const cn: Cn = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs));
};

type NormalizePatname = (pathname: string) => string;

const normalizePathname: NormalizePatname = (pathname) => {
   if (pathname === "/id") return "/";
   return pathname.replace("/id", "").replace("/en", "");
};
export { cn, normalizePathname };
