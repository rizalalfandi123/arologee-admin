import { Button } from "@/components";
import { fetchApi } from "@/lib/fetch-api";
import { DetailUserVerificationResponse } from "@/lib/types";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormUserVerification from "./form-user-verification";
import { initialUserVerificationRoute } from "../../initial-route";
import BadgeStatus from "../../badge-status";

const getDetailUserVerification = (id: string) => async () => {
   const { data } = await fetchApi<DetailUserVerificationResponse>(`/user/detail-request-verified/${id}`, {
      method: "GET",
   });

   return data;
};

export default async function DetailUserVerification({ params }: { params: { id: string } }) {
   const id = params["id"];

   const data = await getDetailUserVerification(id)();

   return (
      <div className="flex h-full w-full flex-col lg:flex-row">
         <div className="flex flex-col grow divide-y divide-[#48484A]">
            <div className="p-6 flex gap-2 items-center">
               <Button size="icon" variant="ghost" asChild>
                  <Link href={initialUserVerificationRoute}>
                     <ChevronLeft />
                  </Link>
               </Button>
               <h2 className="font-semibold text-lg lg:text-[28px]">Verifikasi Data Pengguna</h2>
               <BadgeStatus status={data.is_verified} />
            </div>

            <div className="flex flex-col p-6">
               <h5 className="font-semibold text-lg">Foto Ktp</h5>

               <Image
                  className="py-3 w-[610px] h-[330px] object-contain float-left"
                  src={data.identity_card}
                  width={610}
                  height={330}
                  alt="ktp"
               />

               <h5 className="font-semibold text-lg">NIK</h5>

               <p className="py-2">{data.nik}</p>
            </div>
         </div>

         <div className="w-full p-6 h-[350px] border-t shrink-0 lg:w-[350px] lg:h-full lg:border-l border-[#48484A]">
            <p className="text-[#8E8E93]">1 Juni 2023, 08:25 WIB</p>

            <FormUserVerification initialData={data} />
         </div>
      </div>
   );
}
