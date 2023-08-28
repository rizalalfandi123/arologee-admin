"use client";

import { Button } from "@/components";
import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserOptions() {
   const router = useRouter();

   const handleLogout = () => {
      Cookies.remove("auth");
      router.push("/login");
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="hover:bg-background">
               <MoreVerticalIcon />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={handleLogout} className="text-primary">
               <LogOutIcon className="w-5 h-5 mr-2" />
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
