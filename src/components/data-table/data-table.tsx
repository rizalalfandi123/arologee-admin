"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Header,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isInitialLoading: boolean;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data, isInitialLoading } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="border-collapse relative">
      <TableHeader className="sticky top-0">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className="border border-[#48484A] border-t-0"
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="overflow-y-scroll">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="border border-[#48484A]" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            {isInitialLoading ? (
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading
              </TableCell>
            ) : (
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
