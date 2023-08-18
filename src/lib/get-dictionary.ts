import "server-only";
import type { Locale } from "./types";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  id: () => import("../dictionaries/id.json").then((module) => module.default),
};


export const getDictionary = async (locale: Locale) =>
dictionaries[locale]?.() ?? dictionaries.en();
