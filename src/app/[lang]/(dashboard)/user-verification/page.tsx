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
      <h1 className="text-2xl font-semibold p-6 mb-2">
        {userVerificationDictionaries["user-overview"]}
      </h1>

      <div className="w-full px-6 pb-6 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-4">
        {summaryCards.map((card) => {
          return <SummaryCard key={card.title} {...card} />;
        })}
      </div>

      <div className="px-6 flex flex-col gap-2 lg:items-center lg:flex-row lg:justify-between">
        <p className="text-xl">{userVerificationDictionaries["data-user"]}</p>

        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
          <Input placeholder={dictionaries["search"]} prefixIcon={<Search />} />
          <Input placeholder={dictionaries["search"]} />

          <SelectStatus />
        </div>
      </div>

      <div className="px-2">
        <UserTable />
      </div>
    </div>
  );
}
