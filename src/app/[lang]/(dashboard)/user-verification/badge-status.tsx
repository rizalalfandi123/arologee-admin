import { Badge, BadgeProps } from "@/components/ui/badge";
import React from "react";

export default function BadgeStatus({ status }: { status: number }) {
   const badgeProps: { label: string; color: BadgeProps["color"] } = React.useMemo(() => {
      switch (status) {
         case 1: {
            return { label: "Request", color: "warning" };
         }

         case 3: {
            return { label: "Disetujui", color: "success" };
         }

         default: {
            return { label: "Ditolak", color: "error" };
         }
      }
   }, []);

   return <Badge color={badgeProps.color}>{badgeProps.label}</Badge>;
}
