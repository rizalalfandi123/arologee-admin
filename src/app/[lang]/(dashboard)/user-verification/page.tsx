import "server-only";

import { getDictionary } from "@/lib/get-dictionary";
import { DictionaryProps, TotalRequestVerifiedResponse } from "@/lib/types";
import SummaryCard, {
  type SummaryCardProps as SummaryCardItem,
} from "./summary-card";
import UserTable from "./user-table";
import { fetchApi } from "@/lib/fetch-api";
import FilterList from "./filter-list";

interface UserVerificationProps extends DictionaryProps {}

const getSummaryValues: () => Promise<
  TotalRequestVerifiedResponse["data"]
> = async () => {
  const { data } = await fetchApi<TotalRequestVerifiedResponse>(
    "/user/total-request-verified",
    { method: "GET" }
  );

  return data;
};

export default async function UserVerification(props: UserVerificationProps) {
  const {
    params: { lang },
  } = props;

  const summaryValues = await getSummaryValues();

  const dictionaries = await getDictionary(lang);

  const userVerificationDictionaries = dictionaries["user-verification-page"];

  const summaryCards: Array<SummaryCardItem> = [
    {
      title: userVerificationDictionaries["submission-totals"],
      value: summaryValues.total,
    },
    {
      title: userVerificationDictionaries["verified-user"],
      value: summaryValues.total_approved,
    },
    {
      title: userVerificationDictionaries["waiting-for-verification"],
      value: summaryValues.total_requested,
    },
    {
      title: userVerificationDictionaries["submission-totals"],
      value: summaryValues.total_rejected,
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
          <FilterList
            dictionaries={{
              ...dictionaries["user-verification-page"],
              search: dictionaries.search,
            }}
          />
        </div>
      </div>

      <UserTable />
    </div>
  );
}
