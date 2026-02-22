'use client'

import { FormNewExp } from "@/components/form-new-exp";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function FormPage() {
    return (
        <div>
            <div className="flex justify-between p-5 items-center w-full h-20 text-white">
                <FaArrowLeft onClick={() => redirect('/')} className="size-10 cursor-pointer hover:text-gray-400" />
                <h1>Adicione uma nova despesa</h1>
            </div>


            <div className="mt-18 flex justify-center w-full">
                <FormNewExp />
            </div>
        </div>
    )
}