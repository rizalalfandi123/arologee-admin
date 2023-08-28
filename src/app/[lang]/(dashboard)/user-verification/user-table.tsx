"use client";

import React from "react";
import { http } from "@/lib/axios";
import { UserVerificationListResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BadgeStatus from "./badge-status";

type VerificationUser = UserVerificationListResponse["data"][number] & {
   action: string;
};

export default function UserTable() {
   const searchParams = useSearchParams();

   const queryParams = React.useMemo(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("limit", "25");

      params.set("offset", "0");

      return params.toString();
   }, [searchParams.toString()]);

   const { data = [], isLoading } = useQuery({
      queryKey: ["USER_VERIFICATION_LIST", queryParams],

      queryFn: async (data) => {
         console.log({ data });
         return http.get<UserVerificationListResponse>(`/user/list-request-verified?${data.queryKey[1]}`);
      },

      select: (response) => {
         return (response.data.data || []).map((item) => ({
            ...item,
            action: `/user-verification/detail/${item.id}`,
         }));
      },
   });

   const columns: ColumnDef<VerificationUser, string | number>[] = [
      {
         accessorKey: "created_at",
         header: "Tanggal",
         cell: (data) => {
            const value = (data.getValue() as string).split(" ");

            return (
               <div className="flex flex-col gap-2">
                  <span>{value[0]}</span>
                  <span className="text-xs">{value[1]}</span>
               </div>
            );
         },
      },
      {
         accessorKey: "name",
         header: "Nama",
      },
      {
         accessorKey: "phone_number",
         header: "Contact",
      },
      {
         accessorKey: "is_verified",
         header: "Status",
         cell: (data) => {
            return <BadgeStatus status={data.getValue() as number} />;
         },
      },
      {
         accessorKey: "action",
         header: "Verifikasi Ditolak",
         cell: (data) => {
            return (
               <Button variant="link" asChild>
                  <Link href={data.getValue() as string}>Lihat Detail</Link>
               </Button>
            );
         },
      },
   ];

   return (
      <div className="w-full max-h-[calc(100dvh-320px)] overflow-auto border border-[#48484A]">
         <DataTable isInitialLoading={isLoading} columns={columns} data={data} />
      </div>
   );
}
