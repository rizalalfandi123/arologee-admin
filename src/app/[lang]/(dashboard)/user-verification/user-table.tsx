import { Button } from "@/components";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function UserTable() {
  return (
    <div className="w-full max-h-[calc(100dvh-320px)] overflow-auto border border-[#48484A]">
      <Table className="border-collapse relative">
        <TableHeader className="sticky top-0">
          <TableRow>
            <TableHead className="border border-[#48484A] border-t-0">
              Tanggal
            </TableHead>
            <TableHead className="border border-[#48484A] border-t-0">
              Nama
            </TableHead>
            <TableHead className="border border-[#48484A] border-t-0">
              Contact
            </TableHead>
            <TableHead className="border border-[#48484A] border-t-0">
              Status
            </TableHead>
            <TableHead className="border border-[#48484A] border-t-0">
              Verifikasi Ditolak
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((ang) => {
            return (
              <TableRow key={ang}>
                <TableCell className="border border-[#48484A]">
                  <div className="flex flex-col gap-2">
                    <span>{ang} Juni 2023</span>
                    <span className="text-xs">10:41 pm</span>
                  </div>
                </TableCell>
                <TableCell className="border border-[#48484A]">
                  <div className="flex flex-col gap-2">
                    <span>Esther Howard</span>
                    <span className="text-xs">tim.jennings@example.com</span>
                  </div>
                </TableCell>
                <TableCell className="border border-[#48484A]">
                  0812186458212
                </TableCell>

                <TableCell className="border border-[#48484A]">
                  <Badge>Disetujui</Badge>
                </TableCell>
                <TableCell className="border border-[#48484A]">
                  <Button variant="link" asChild>
                    <Link href="/">Lihat Detail</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
