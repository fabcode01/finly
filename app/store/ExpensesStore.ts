import { create } from "zustand";
import { ExpensesCardProps } from "../utils/interfaces";
import { v4 as uuid } from "uuid";


type ExpenseStore = {
    expenses: ExpensesCardProps[]
    addExpenses: (data: ExpensesCardProps) => void
    updateExpenses: (id: string) => void
    deleteExpenses: (id: string) => void
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
    expenses: [{
        id: uuid(),
        categoria: 'alimentacao',
        data: '23/02/2026',
        descricao: 'mcdonalds',
        status: 'topay',
        valor: 55
    }],

    addExpenses: (data: ExpensesCardProps) => set((state) => ({
        expenses: [...state.expenses, {
            id: uuid(),
            categoria: data.categoria,
            data: data.data,
            descricao: data.descricao,
            status: data.status,
            valor: data.valor
        }]
    })),

    updateExpenses: (id: string) => set((state) => ({
        expenses: state.expenses.map((value) => {
            return value.id === id ? { ...value, status: 'pay' } : value
        })
    })),

    deleteExpenses: (id: string) => set((state) => ({
        expenses: state.expenses.filter((value) => value.id != id)

    }))

}))