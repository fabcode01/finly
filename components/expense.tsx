
import { ExpensesCardProps } from "@/app/utils/interfaces";
import { Button } from "./ui/button";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useExpenseStore } from "@/app/store/ExpensesStore";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner"



export function ExpensesCard(props: ExpensesCardProps) {

    const store = useExpenseStore()

    function deleteExpenses(id: string) {
        store.deleteExpenses(id)
        toast.success('Deletada com sucesso!')
    }

    function updateExpenses(id: string) {
        store.updateExpenses(id)
        toast.success('Despesa paga!')
    }

    return (
        <div className={`flex flex-col p-2 w-[90%] h-auto ${props.status == 'topay' ? 'bg-gray-800' : 'bg-emerald-950'} rounded-xl`}>
            <h1>{props.descricao}</h1>
            <div className="flex items-center gap-2">
                <BiSolidCategoryAlt size={10} className="text-gray-400" />
                <h1 className="text-xs">{props.categoria}</h1>
            </div>
            <div className="flex items-center gap-2">
                <BsCalendar2DateFill size={10} className="text-gray-400" />
                <h1 className="text-xs">{props.data}</h1>
            </div>



            <div className="flex justify-end">
                <h2 className={`text-xl ${props.status == 'topay' ? '' : 'line-through'}`}>R${props.valor}</h2>
            </div>

            <div className="mt-2">
                {props.status == 'topay' ? (
                    <Button onClick={() => updateExpenses(props.id)} className="bg-gray-900 w-full cursor-pointer hover:bg-green-950">Marcar como paga</Button>

                ) : (
                    <div className="w-full">
                        <Button onClick={() => deleteExpenses(props.id)} className="bg-red-900 cursor-pointer hover:bg-red-950">
                            <FaTrash />
                        </Button>
                    </div>
                )}
            </div>



        </div>
    )
} 