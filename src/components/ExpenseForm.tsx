import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import { DraftExpense, Value } from "../types/types"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"
import SelectCategory from "./SelectCategory"

const initialExpense: DraftExpense = {
    amount: 0,
    expenseName: "",
    category: "1",
    date: new Date()
}
function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>(initialExpense);
    const [error, setError] = useState("");
    const [previousAmount, setPreviousAmount] = useState(0);

    useEffect(() => {
        console.log(expense)
    }, [expense])

    const { state, dispatch, getAvailable } = useBudget();

    const isEditing = useMemo(() => state.editingId != "", [state.editingId])

    useEffect(() =>{
        if(isEditing){
            const editingExpense = state.expenses.find(exp => exp.id == state.editingId)
            setExpense(editingExpense!)
            setPreviousAmount(editingExpense!.amount)
        }
    }, [state.editingId])

    const handleChangeDate = (value: Value) =>{
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
        const isNumber = ["amount"].includes(e.target.id)
        setExpense({
            ...expense,
            [e.target.id]: isNumber ? +e.target.value : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(expense).includes("") || Object.values(expense).includes(null) || Object.values(expense).includes(0)){
            setError("Todos los campos son obligatorios.")
            return
        }
        if(expense.amount <= 0){
            setError("Introduce una cantidad válida.")
            return
        }
        if((expense.amount - previousAmount) > getAvailable){
            return setError("Estás sobregirando tu presupuesto.")
        }

        if(isEditing){
            dispatch({ type: "update-expense", payload: { expense: {...expense, id: state.editingId} } })
        }else{
            dispatch({ type: "add-expense", payload: { expense } })
        }

        setError("")
        setExpense(initialExpense)
        setPreviousAmount(0)
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <legend className={`uppercase font-black text-2xl text-center py-2 border-b-4  ${isEditing ? "border-teal-500" : "border-blue-500"}`}>{isEditing ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            <ErrorMessage>{error}</ErrorMessage>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nombre Gasto</label>
                <input 
                    onChange={handleChange}
                    type="text" 
                    id="expenseName" 
                    className="bg-slate-100 p-2 rounded-md" 
                    placeholder="Añade el nombre del gasto" 
                    name="expenseName"
                    value={expense.expenseName}    
                />
            </div>
            <div className="relative w-full">
                <SelectCategory
                    expense={expense}
                    setExpense={setExpense}
                    isEditing={isEditing}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad</label>
                <input
                    onChange={handleChange} 
                    type="number" 
                    id="amount" 
                    className="bg-slate-100 p-2 rounded-md" 
                    placeholder="Añade la cantidad del gasto Ej. 300" 
                    name="amount"
                    value={expense.amount}       
                />
            </div>
            
            {/* <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoría</label>
                <select
                    onChange={handleChange} 
                    id="category" 
                    className="bg-slate-100 p-2 rounded-md" 
                    name="category"
                    value={expense.category}       
                >
                    <option value={""}>-- Seleccione --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div> */}

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Fecha Gasto</label>
                <DatePicker
                    onChange={handleChangeDate}
                    id="date"
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    name="date"
                />
            </div>

            <input
                type="submit"
                className={` ${isEditing ? "bg-teal-500 hover:bg-teal-600" : "bg-blue-600 hover:bg-blue-700"} transition-all enabled:cursor-pointer w-full p-2.5 text-white font-bold uppercase rounded-lg`}
                value={isEditing ? "Guardar Cambios" : "Registrar Gasto"}
            />
        </form>
    )
}

export default ExpenseForm