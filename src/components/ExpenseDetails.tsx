import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list"
import { formatDate } from "../helpers"
import type { Expense } from "../types/types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"


type ExpenseDetailsProps = {
    expense: Expense
}

function ExpenseDetails({expense}: ExpenseDetailsProps) {

    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() => categories.find(cat => cat.id == expense.category), [expense]);

    const leadingActions = () =>(
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: "set-editing-id", payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={0.8}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="w-full p-6 bg-white shadow flex gap-5 items-center border-b border-gray-200">
                    <div>
                        <img src={`/icono_${categoryInfo!.icon}.svg`} alt="icono gasto" className="w-24"/>
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm capitalize">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetails