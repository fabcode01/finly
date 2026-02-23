import { ExpensesCardProps } from "@/app/utils/interfaces";
import { ExpensesCard } from "./expense";

interface ListProps {
    data: ExpensesCardProps[]
}

export function ListViewer(props: ListProps) {

    return (
        <div className="flex flex-col items-center gap-3 justify-center text-white overflow-auto pt-5 pb-8 mb-16">
            {props.data && 
                props.data?.map((v, i) => (
                    <ExpensesCard  key={v.id} id={v.id} categoria={v.categoria} data={v.data} descricao={v.descricao} valor={v.valor} status={v.status}/>

            ))}



        </div>

    )
}