"use client";

import React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { http } from "@/lib/axios";
import { UserVerificationListResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { addDays, format } from "date-fns";

type VerificationUser = UserVerificationListResponse["data"][number] & {
  action: string;
};

export default function UserTable() {
  const searchParams = useSearchParams();

  const queryParams = React.useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", "25");

    if (!params.get("end_date")) {
      params.set("end_date", format(new Date(), "d-M-yyyy"));
    }

    if (!params.get("start_date")) {
      params.set("start_date", format(addDays(new Date(), -30), "d-M-yyyy"));
    }

    if (!params.get("status")) {
      params.set("status", "0,1,2");
    }

    // if (searchParams.get("search")) {
    //   params.search = searchParams.get("search")!;
    // }

    // if (searchParams.get("status")) {
    //   params.status = searchParams.get("status")!;
    // }

    // if (searchParams.get("end_date")) {
    //   params.search = searchParams.get("end_date")!;
    // }

    // if (searchParams.get("end_date")) {
    //   params.search = searchParams.get("end_date")!;
    // }

    return params.toString();
  }, [searchParams.toString()]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["USER_VERIFICATION_LIST", queryParams],

    queryFn: async (data) => {
      console.log({ data });
      return http.get<UserVerificationListResponse>(
        `/user/list-request-verified?${data.queryKey[1]}`
      );
    },

    select: (response) => {
      return (response.data.data || []).map((item) => ({
        ...item,
        action: `/user-verification/${item.id}`,
      }));
    },
  });

  console.log({ data });

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
        const status: { label: string; color: BadgeProps["color"] } =
          (function () {
            switch (data.getValue()) {
              case 0: {
                return { label: "Request", color: "warning" };
              }

              case 1: {
                return { label: "Disetujui", color: "success" };
              }

              default: {
                return { label: "Ditolak", color: "error" };
              }
            }
          })();

        return <Badge color={status.color}>{status.label}</Badge>;
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

  // console.log({ data, queryParams });

  return (
    <div className="w-full max-h-[calc(100dvh-320px)] overflow-auto border border-[#48484A]">
      <DataTable isInitialLoading={isLoading} columns={columns} data={data} />
    </div>
  );
}
