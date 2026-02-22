'use client'

import { months } from "@/app/utils/months";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";


export function HeaderActions() {

    let obj = {
        id: 'Janeiro/2026',
            content: {
                tipo: "saude",
                valor: 3414
            }
    }


    const [date, setDate] = useState(new Date())

    const year = date.getFullYear()
    const monthName = `${months[date.getMonth()]}/${year}` 
    

    function nextMonth() {
        setDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() + 1)
            return newDate
        })
    }

    function prevMonth() {
        setDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(prev.getMonth() - 1)
            return newDate
        })
    }

    return (
        <div className="flex justify-between items-center p-5 gap-5 h-28 bg-linear-to-r from-slate-800 to-slate-900 w-full text-white [&_span]:cursor-pointer">
            <span onClick={() => prevMonth()}><FaArrowLeft /></span>

            <div>
                <div className="flex justify-center text-xl">
                    <h4>{monthName}</h4>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-sm">Total despesas:</h3>
                    <h4>R$ 1.984,85</h4>
                </div>
            </div>

            <span onClick={() => nextMonth()}><FaArrowRight /></span>
        </div>

    )
}