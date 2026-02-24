import { create } from "zustand";
import { ExpensesCardProps } from "../utils/interfaces";
import { v4 as uuid } from "uuid";
import { createJSONStorage, persist } from "zustand/middleware";


type ExpenseStore = {
    expenses: ExpensesCardProps[]
    addExpenses: (data: ExpensesCardProps) => void
    updateExpenses: (id: string) => void
    deleteExpenses: (id: string) => void
}

export const useExpenseStore = create<ExpenseStore>()(
    persist(
        (set) => ({
            expenses: [],

            addExpenses: (data) => set((state) => ({
                    expenses: [...state.expenses,{...data,}],
                })),

            updateExpenses: (id: string) =>
                set((state) => ({
                    expenses: state.expenses.map((value) =>
                        value.id === id ? { ...value, status: "pay" } : value
                    ),
                })),

            deleteExpenses: (id) =>
                set((state) => ({
                    expenses: state.expenses.filter((value) => value.id !== id),
                })),
        }),
        {
            name: "expenses",
            storage: createJSONStorage(() => localStorage),
        }
    )
)