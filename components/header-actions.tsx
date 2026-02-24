'use client'

import { months } from "@/app/utils/months";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { ListViewer } from "./list-viewer";
import { ExpensesCardProps } from "@/app/utils/interfaces";
import { useExpenseStore } from "@/app/store/ExpensesStore";

export let Despesas: ExpensesCardProps[] = [
    {
        id: 'a824e078-8ee6-4ce6-a133-6f5cadb4',
        categoria: 'teste',
        data: '25/02/2026',
        descricao: 'testandi',
        valor: 55.99,
        status: 'topay'
    }

]

export function HeaderActions() {

    const [date, setDate] = useState(new Date())

    const [despesasMes, setDespesasMes] = useState<ExpensesCardProps[]>([])
    const [totalMes, setTotalMes] = useState<string>('')

    const store = useExpenseStore()

    const year = date.getFullYear()

    let monthName = `${months[date.getMonth()]}/${year}`

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

    function update() {
        const formatedDate = date.toLocaleDateString('pt-br', {
            month: '2-digit',
            year: 'numeric'
        })


        let filterDespesas = store.expenses.filter((v) => {
            let [, mes, ano] = v.data.split('/')
            let resultado = `${mes}/${ano}`


            return formatedDate == resultado
        })

        let total = 0
        filterDespesas.forEach((v) => {
            total += v.valor
        })

        const totalReal = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
        }).format(total)

        setTotalMes(totalReal)
        setDespesasMes(filterDespesas)

    }

    function updateExpenses(id: string) {
        // console.log(id);

        const updated = Despesas.map((value) => {
            return value.id == id ? { ...value, status: 'pay' } : value
        })

    }

    useEffect(() => {

        update()

    }, [monthName, store.expenses])



    return (
        <>
            <div className="sticky top-0 flex justify-between items-center p-5 gap-5 bg-linear-to-r from-slate-800 to-slate-900 w-full text-white [&_span]:cursor-pointer">
                <span onClick={() => prevMonth()}><FaArrowLeft /></span>
                <div>
                    <div className="flex justify-center text-xl">
                        <h4>{monthName}</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-sm">Total despesas:</h3>
                        <h4>{totalMes}</h4>
                    </div>
                </div>
                <span onClick={() => nextMonth()}><FaArrowRight /></span>
            </div>
            <div>
                <ListViewer data={despesasMes} />
            </div>
        </>

    )
}