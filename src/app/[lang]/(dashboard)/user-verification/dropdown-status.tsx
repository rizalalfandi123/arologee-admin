import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectStaus() {
  return (
    <Select>
      <SelectTrigger className="w-full text-placeholder lg:w-fit">
        <SelectValue placeholder="Semua" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blueberry">Request Pengajuan</SelectItem>
        <SelectItem value="grapes">Disetujui</SelectItem>
        <SelectItem value="pineapple">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
}
