import { NodeEventTarget } from "node:events";
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
import { setDate } from "date-fns";
import { ChevronDownIcon, Calendar } from "lucide-react";
import { format } from "node:path";
import { Popover } from "radix-ui";
import { PopoverTrigger, PopoverContent } from "./ui/popover";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { months } from "@/app/utils/months";



const categorias = [
    { nome: 'Moradia', value: 'moradia' },
    { nome: 'Alimentação', value: 'alimentacao' },
    { nome: 'Transporte', value: 'transporte' },
    { nome: 'Contas', value: 'contas' },
    { nome: 'Lazer', value: 'lazer' },
    { nome: 'Saúde', value: 'saude' },
]


export function FormNewExp() {
    const [date, setDate] = useState<Date>()

    const [categoria, setCategoria] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')


    function createUser(event: React.SubmitEvent) {
        event.preventDefault()
        const dateInst = new Date(data)

       const despesa = {
        group: `${months[dateInst.getMonth()]}/${dateInst.getFullYear()}`,
        categoria,
        descricao,
        valor
       }
        
        console.log(despesa);
        
    }

    return (
        <form className="flex flex-col gap-5  text-white w-2/3" onSubmit={(e) => createUser(e)}>

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
                <Input onChange={(value) => setDescricao(value.target.value)} type="text" placeholder="Descrição" />

            </Field>

            <Field>
                <FieldLabel>Valor:</FieldLabel>

                <Input  onChange={(value) => setValor(value.target.value)}  type="number" placeholder="Valor" step={0.01} />

            </Field>

            <Field>
                <FieldLabel>Vencimento:</FieldLabel>
                <Input onChange={value => setData(value.target.value)} name="date" type="date" />
            </Field>


            <Button>Adicionar</Button>
        </form>
    )
}