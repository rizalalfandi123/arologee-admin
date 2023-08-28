"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dictionaries } from "@/lib/types";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormProvider, useForm, Control, useWatch } from "react-hook-form";
import { FilterStatusUserVerification, FilterUserVerification, filterListSchema } from "./filer-list-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components";
import { cn } from "@/lib/utlis";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/use-debounce";
import { parse } from "date-fns";
import TextField from "@/components/form/text-field";

interface FilterListProps {
   dictionaries: Dictionaries["user-verification-page"] & { search: string };
}

export default function FilterList({ dictionaries }: FilterListProps) {
   const searchParams = useSearchParams();

   const form = useForm<FilterUserVerification>({
      resolver: zodResolver(filterListSchema),
      defaultValues: {
         search: searchParams.get("search") ?? "",
         status: (searchParams.get("status") as FilterUserVerification["status"]) ?? "1,2,3",
         date: {
            to: searchParams.get("end_date") ? parse(searchParams.get("end_date")!, "yyyy-M-d", new Date()) : new Date(),
            from: searchParams.get("start_date")
               ? parse(searchParams.get("start_date")!, "yyyy-M-d", new Date())
               : addDays(new Date(), -30),
         },
      },
   });

   const statusOptions: Record<FilterStatusUserVerification, string> = {
      "1,2,3": "Semua",
      "1": "Request Pengajuan",
      "2": "Ditolak",
      "3": "Disetujui",
   };
   return (
      <>
         <FormProvider {...form}>
            <TextField<FilterUserVerification>
               control={form.control}
               name="search"
               placeholder={dictionaries["search"]}
               prefixIcon={<Search />}
            />

            <FormField
               control={form.control}
               name="date"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <div className="grid gap-2">
                        <Popover>
                           <PopoverTrigger asChild>
                              <Button
                                 id="date"
                                 variant="secondary"
                                 className={cn("w-full justify-start text-left font-normal lg:w-[258px]")}
                              >
                                 <CalendarIcon className="mr-2 h-4 w-4" />
                                 {field.value.from ? (
                                    field.value.to ? (
                                       `${format(field.value.from, "LLL dd, y")} - ${format(field.value.to, "LLL dd, y")}`
                                    ) : (
                                       format(field.value.from, "LLL dd, y")
                                    )
                                 ) : (
                                    <span>Pick a date</span>
                                 )}
                              </Button>
                           </PopoverTrigger>
                           <PopoverContent className="w-auto p-0 bg-background text-slate-50" align="start">
                              <Calendar
                                 initialFocus
                                 mode="range"
                                 defaultMonth={field.value.from}
                                 selected={field.value}
                                 onSelect={field.onChange}
                                 numberOfMonths={2}
                              />
                           </PopoverContent>
                        </Popover>
                     </div>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="status"
               render={({ field }) => (
                  <FormItem>
                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <SelectTrigger className="w-full text-placeholder lg:w-fit">
                           <SelectValue placeholder="Semua" />
                        </SelectTrigger>

                        <SelectContent>
                           {Object.entries(statusOptions).map(([value, label]) => {
                              return (
                                 <SelectItem value={value} key={label}>
                                    {label}
                                 </SelectItem>
                              );
                           })}
                        </SelectContent>
                     </Select>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </FormProvider>

         <FilterListListener control={form.control} />
      </>
   );
}

const FilterListListener = ({ control }: { control: Control<FilterUserVerification> }) => {
   const filterValues = useWatch({ control });

   const router = useRouter();

   const pathname = usePathname();

   const currentSearchParams = useSearchParams();

   const searchValue = useDebounce<string>(filterValues.search ?? "", 1000);

   const newSearchParams = React.useMemo(() => {
      const params = new URLSearchParams(currentSearchParams.toString());

      if (searchValue !== (currentSearchParams.get("search") ?? "")) {
         params.set("search", searchValue);
      }

      params.set("status", filterValues.status ?? "1,2,3");

      if (filterValues.date?.to) {
         params.set("end_date", format(filterValues.date.to, "yyyy-M-d"));
      }

      if (filterValues.date?.from) {
         params.set("start_date", format(filterValues.date.from, "yyyy-M-d"));
      }

      return params;
   }, [filterValues, searchValue]);

   React.useEffect(() => {
      if (currentSearchParams.toString() !== newSearchParams.toString()) {
         router.push(`${pathname}?${newSearchParams.toString()}`);
      }
   }, [newSearchParams.toString()]);

   return null;
};
