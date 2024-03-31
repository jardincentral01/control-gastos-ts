import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails"


function ExpenseList() {

    const { state } = useBudget()

    const isFiltered = useMemo(() => state.categoryId, [state.categoryId])
    
    const filteredExpenses = isFiltered ? state.expenses.filter(exp => exp.category == state.categoryId) : state.expenses
    const isEmpty = useMemo(() => filteredExpenses.length == 0, [state.expenses])

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl text-center">No Hay Gastos</p>
            ) : (
                <>
                    <h3 className="text-2xl text-gray-600 font-bold mb-5">Tus Gastos</h3>

                    {(filteredExpenses.map(exp => (
                        <ExpenseDetails
                            key={exp.id}
                            expense={exp}
                        />
                    )))}
                </>
            )}
        </div>
    )
}

export default ExpenseList