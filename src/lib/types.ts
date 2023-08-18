import { i18n } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export type Locale = (typeof i18n)["locales"][number];

export interface DictionaryProps {
  params: { lang: Locale };
}

export type Dictionaries = Awaited<ReturnType<typeof getDictionary>>