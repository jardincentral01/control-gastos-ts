import {v4 as uuidv4} from "uuid"
import { Category, DraftExpense, Expense } from "../types/types"

export type BudgetActions = 
    { type: "define-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" }|
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "remove-expense", payload: { id: Expense['id'] } } |
    { type: "set-editing-id", payload: { id: Expense['id'] } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "add-filter-category", payload: { id: Category['id'] } } |
    { type: "remove-filter-category" } |
    { type: "reset-app" } 

export type BudgetState = {
    budget: number
    modal: boolean,
    expenses: Expense[]
    editingId: Expense['id']
    categoryId: Category['id']
}

const initialBudget = () : number =>{
    const localBudget = localStorage.getItem("budget")
    return localBudget ? +localBudget : 0
}

const initialExpenses = () : Expense[] =>{
    const localExpenses = localStorage.getItem("expenses")
    return localExpenses ? JSON.parse(localExpenses) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: "",
    categoryId: ""
}

const createExpense = (expense: DraftExpense) : Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) : BudgetState =>{

    if(action.type == "define-budget"){
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type == "show-modal"){
        return {
            ...state,
            modal: true
        }
    }

    if(action.type == "close-modal"){
        return {
            ...state,
            modal: false,
            editingId: ""
        }
    }

    if(action.type == "add-expense"){
        const newExpense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, newExpense],
            modal: false
        }
    }

    if(action.type == "remove-expense"){
        const updatedExpenses = state.expenses.filter(exp => exp.id != action.payload.id)

        return {
            ...state,
            expenses: updatedExpenses
        }
    }

    if(action.type == "set-editing-id"){

        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type == "update-expense"){
        const updatedExpenses = state.expenses.map(exp => exp.id == action.payload.expense.id ? action.payload.expense : exp)
        return {
            ...state,
            expenses: updatedExpenses,
            modal: false,
            editingId: ""
        }
    }

    if(action.type == "reset-app"){
        return {
            budget: 0,
            modal: false,
            expenses: [],
            editingId: "",
            categoryId: ""
        }
    }

    if(action.type == "add-filter-category"){
        return {
            ...state,
            categoryId: action.payload.id
        }
    }

    if(action.type == "remove-filter-category"){
        return {
            ...state,
            categoryId: ""
        }
    }

    return state
}