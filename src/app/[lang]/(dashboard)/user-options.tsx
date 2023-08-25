"use client";

import { Button } from "@/components";
import { LogOutIcon, MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { http } from "@/lib/axios";

const refres = () => axios.get('/api/generate-access-token')

const aaa = async () => {
  await http.get('/user/list-request-verified?start_date=2023-08-19&end_date=2023-08-19&status=1%2C2&limit=25&offset=0')
}

export default function UserOptions() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleLogout} className="text-primary">
          <LogOutIcon className="w-5 h-5 mr-2" />
          Logout
        </DropdownMenuItem>

        <DropdownMenuItem onClick={aaa}>Refresh</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
