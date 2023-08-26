"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dictionaries } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormProvider, useForm, Control, useWatch } from "react-hook-form";
import {
  FilterStatusUserVerification,
  FilterUserVerification,
  filterListSchema,
} from "./filer-list-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components";
import { cn } from "@/lib/utlis";

interface FilterListProps {
  dictionaries: Dictionaries["user-verification-page"] & { search: string };
}

export default function FilterList({ dictionaries }: FilterListProps) {
  const form = useForm<FilterUserVerification>({
    resolver: zodResolver(filterListSchema),
    defaultValues: {
      search: "",
      status: "1,2,3",
      date: {
        to: new Date(),
        from: addDays(new Date(), -30),
      },
    },
  });

  const statusOptions: Record<FilterStatusUserVerification, string> = {
    "1,2,3": "Semua",
    "1": "Request Pengajuan",
    "2": "Disetujui",
    "3": "Ditolak",
  };
  return (
    <>
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={dictionaries["search"]}
                  prefixIcon={<Search />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <DatePickerWithRange className="w-full lg:w-[258px]" />

<SelectStatus /> */}

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
                      className={cn(
                        "w-full justify-start text-left font-normal lg:w-[258px]"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-background text-slate-50"
                    align="start"
                  >
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
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

const FilterListListener = ({
  control,
}: {
  control: Control<FilterUserVerification>;
}) => {
  const filterValues = useWatch({ control });

  console.log({ filterValues });

  // const router = useRouter();

  // const pathname = usePathname();

  // const searchParams = useSearchParams();

  // const searchValue = useDebounce<string>(filterValues.search ?? "", 1000);

  // //   React.useEffect(() => {
  // //     if ((searchParams.get("search") ?? "") !== searchValue) {
  // //       router.replace(
  // //         queryString.stringifyUrl({
  // //           url: pathname,
  // //           query: { search: searchValue },
  // //         })
  // //       );
  // //     }
  // //   }, [searchValue]);

  return null;
};
