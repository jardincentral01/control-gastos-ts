import { useState, ChangeEvent, FormEvent, useMemo } from "react"
import { useBudget } from "../hooks/useBudget";

function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const noBudget = useMemo(() => budget <= 0 || isNaN(budget), [budget])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setBudget(e.target.valueAsNumber)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        dispatch({ type: "define-budget", payload: { budget } })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-5">
                <label 
                    htmlFor="budget" 
                    className="text-4xl text-blue-600 font-bold text-center"
                >Definir Presupuesto</label>
                <input 
                    id="budget" 
                    type="number" 
                    className="w-full bg-white border border-gray-200 p-2" 
                    placeholder="Define tu Presupuesto" 
                    name="budget"
                    onChange={handleChange}
                    value={budget}
                />
            </div>

            <input 
                type="submit" 
                value="Definir Presupuesto" 
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-15 uppercase font-bold text-white w-full p-2.5 enabled:cursor-pointer transition-all ease-in"
                disabled={noBudget}
            />
        </form>
    )
}

export default BudgetForm