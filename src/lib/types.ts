import { i18n } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export type Locale = (typeof i18n)["locales"][number];

export interface DictionaryProps {
  params: { lang: Locale };
}

export type Dictionaries = Awaited<ReturnType<typeof getDictionary>>;

export interface MetaResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
}

export type ApiResponse<T> = {
  data: T;
} & MetaResponse;

export type LoginResponse = ApiResponse<{
  refresh_token: string;
  access_token: string;
  is_vendor: boolean;
  finished_registration: boolean;
}>;

export type TotalRequestVerifiedResponse = ApiResponse<{
  total: number;
  total_requested: number;
  total_rejected: number;
  total_approved: number;
}>;

export type UserVerificationListResponse = ApiResponse<
  Array<{
    id: number;
    name: string;
    email: string;
    phone_number: string;
    is_verified: 1 | 2;
    created_at: string;
  }>
>;
