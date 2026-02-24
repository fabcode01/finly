
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "./ui/select";

import { useState } from "react";
import { Field, FieldLabel } from "./ui/field";

import { ExpensesCardProps } from "@/app/utils/interfaces";
import { useExpenseStore } from "@/app/store/ExpensesStore";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuid } from "uuid"




const categorias = [
    { nome: 'Moradia', value: 'Moradia' },
    { nome: 'Alimentação', value: 'Alimentação' },
    { nome: 'Transporte', value: 'Transporte' },
    { nome: 'Contas', value: 'Contas' },
    { nome: 'Lazer', value: 'Lazer' },
    { nome: 'Saúde', value: 'Saúde' },
]


export function FormNewExp() {

    const [categoria, setCategoria] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')

    const store = useExpenseStore()


    function createUser(event: React.SubmitEvent) {
        event.preventDefault()

        // Resolve o bug de um dia a menos no Date
        const [year, month, day] = data.split("-").map(Number)

        const dateInst = new Date(year, month - 1, day)

        const formatedDate = dateInst.toLocaleDateString('pt-br')


        // Objeto da despesa
        const despesa:ExpensesCardProps = {
            id: uuid(),
            categoria,
            descricao,
            valor: Number(valor),
            data: formatedDate,
            status: 'topay'

        }

        // console.log(despesa);
        
        store.addExpenses(despesa)
        toast.success('Adicionado com sucesso!')
        redirect('/')


    }

    return (
        <form className="flex flex-col gap-5  text-white w-2/3 max-w-150" onSubmit={(e) => createUser(e)}>

            <Field>
                <FieldLabel>
                    Categoria:
                </FieldLabel>
                <Select required onValueChange={(value) => setCategoria(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white">
                        <SelectGroup >
                            <SelectLabel>Categoria</SelectLabel>
                            {categorias.map((categoria) => (
                                <SelectItem key={categoria.value} value={categoria.value}>{categoria.nome}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            <Field>
                <FieldLabel>Descrição:</FieldLabel>
                <Input onChange={(value) => setDescricao(value.target.value)} type="text" placeholder="Descrição" required/>

            </Field>

            <Field>
                <FieldLabel>Valor:</FieldLabel>

                <Input required onChange={(value) => setValor(value.target.value)} type="number" placeholder="Valor" step={0.01} />

            </Field>

            <Field>
                <FieldLabel>Vencimento:</FieldLabel>
                <Input required onChange={value => setData(value.target.value)} name="date" type="date" />
            </Field>


            <Button>Adicionar</Button>
        </form>
    )
}