"use client"

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useExpenseStore } from "../store/ExpensesStore"
import { redirect } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"

const COLORS = [
    "#7F1D1D", // vermelho escuro
    "#14532D", // verde escuro
    "#1E3A8A", // azul escuro
    "#4C1D95", // roxo escuro
    "#7C2D12", // laranja queimado
    "#713F12"  // mostarda escuro
]
export default function GraficoPizza() {
    const { expenses } = useExpenseStore()

    const data = Object.values(
        expenses.reduce((acc, expense) => {
            if (!acc[expense.categoria]) {
                acc[expense.categoria] = {
                    name: expense.categoria,
                    value: 0
                }
            }

            acc[expense.categoria].value += Number(expense.valor)
            return acc
        }, {} as Record<string, { name: string; value: number }>)
    )

    return (
        <div>
            <div className="flex justify-between p-5 items-center w-full h-20 text-white">
                <FaArrowLeft onClick={() => redirect('/')} className="size-10 cursor-pointer hover:text-gray-400" />
                <h1>Relação de despesas</h1>
            </div>

            {expenses.length == 0 ? (
                <div className="flex justify-center mt-10">
                    <h1 className="text-white">Ainda não há despesas cadastradas.</h1>
                </div>
            ):(
                <div className="select-none" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <PieChart tabIndex={-1} className="focus:outline-none focus:border-none">
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80} // menor no mobile
                            innerRadius={50}
                             label={({ name }) => name}
                            stroke="none"
                           className="focus:outline-none focus:border-none"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            )}
            
        </div>
    )
}