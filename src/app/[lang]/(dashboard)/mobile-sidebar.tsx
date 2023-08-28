import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { Dictionaries } from "@/lib/types";
import { Button } from "@/components";
import { Menu } from "lucide-react";

interface MobileSidebarProps {
   dictionaries: Dictionaries["sidebar"];
}

export default function MobileSidebar(props: MobileSidebarProps) {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
               <Menu />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="bg-sidebar">
            <Sidebar dictionaries={props.dictionaries} />
         </SheetContent>
      </Sheet>
   );
}
