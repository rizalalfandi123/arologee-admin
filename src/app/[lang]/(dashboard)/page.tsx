import { getDictionary } from "@/lib/get-dictionary";
import { DictionaryProps } from "@/lib/types";

interface DashboardProps extends DictionaryProps {}

export default async function Dashboard(props: DashboardProps) {
   const {
      params: { lang },
   } = props;

   const dictionary = await getDictionary(lang).then((dic) => dic["user-verification-page"]);

   return (
      <div className="flex flex-col">
         <h1 className="text-2xl">page</h1>
      </div>
   );
}
