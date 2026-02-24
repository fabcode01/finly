'use client'

import { IoAddCircle } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { BsFileBarGraphFill } from "react-icons/bs";
import { redirect } from "next/navigation";

export function NavActions() {

    return (

        <div className="flex justify-center">
            <ul className="
            fixed w-full h-20 bottom-0 flex justify-center items-center gap-15
             bg-black
             [&_li]:text-white bg-linear-to-r from-slate-800 to-slate-900
            [&_li]:text-3xl [&_li]:hover:-translate-y-3 [&_li]:transition-all [&_li]:cursor-pointer mt-10
            transition-all duration-1000
            md:w-1/2 md:bottom-5  md:rounded-4xl
            lg:w-1/4
            ">
                <li><FaUserAlt /></li>
                <li onClick={()=>redirect('/form')} className="relative bottom-5"><IoAddCircle className="size-18"/></li>
                <li onClick={()=>redirect('/graphic')}><BsFileBarGraphFill className="size-8" /></li>
            </ul>
        </div>

    )
}