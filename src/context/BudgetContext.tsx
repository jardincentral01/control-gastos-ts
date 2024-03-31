import { createContext, Dispatch, ReactNode, useReducer, useMemo } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

export type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>
    getSpent: number,
    getAvailable: number
}
export type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgetProviderProps) =>{

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const getSpent = useMemo(() => state.expenses.reduce((acc, exp) => acc + exp.amount, 0), [state.expenses])
    const getAvailable = useMemo(() => state.budget - getSpent, [state.expenses, state.budget])

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                getSpent,
                getAvailable
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}

export default BudgetContext