import "server-only";

import { Search } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { DictionaryProps } from "@/lib/types";
import SummaryCard, {
  type SummaryCardProps as SummaryCardItem,
} from "./summary-card";
import { Input } from "@/components/ui/input";
import SelectStatus from "./dropdown-status";
import UserTable from "./user-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface UserVerificationProps extends DictionaryProps {}

export default async function UserVerification(props: UserVerificationProps) {
  const {
    params: { lang },
  } = props;

  const dictionaries = await getDictionary(lang);

  const userVerificationDictionaries = dictionaries["user-verification-page"];

  const summaryCards: Array<SummaryCardItem> = [
    {
      title: userVerificationDictionaries["submission-totals"],
      value: 3,
    },
    {
      title: userVerificationDictionaries["verified-user"],
      value: 7,
    },
    {
      title: userVerificationDictionaries["waiting-for-verification"],
      value: 3,
    },
    {
      title: userVerificationDictionaries["submission-totals"],
      value: 10,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl p-2 font-semibold mb-2 md:p-6">
        {userVerificationDictionaries["user-overview"]}
      </h1>

      <div className="w-full px-2 pb-6 grid grid-cols-1 gap-2 md:px-6 md:grid-cols-2 2xl:grid-cols-4">
        {summaryCards.map((card) => {
          return <SummaryCard key={card.title} {...card} />;
        })}
      </div>

      <div className="px-2 flex flex-col gap-2 md:px-6 lg:items-center lg:flex-row lg:justify-between">
        <p className="text-xl">{userVerificationDictionaries["data-user"]}</p>

        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
          <Input placeholder={dictionaries["search"]} prefixIcon={<Search />} />



          <DatePickerWithRange/>

          <SelectStatus />
        </div>
      </div>

      <UserTable />
    </div>
  );
}
