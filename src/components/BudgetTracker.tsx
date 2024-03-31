import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import 'react-circular-progressbar/dist/styles.css';
import { useMemo } from "react";


function BudgetTracker() {

    const { state, getSpent, getAvailable, dispatch } = useBudget()

    const percentageSpent = useMemo(() => +((getSpent * 100)/state.budget).toFixed(2) , [getSpent, state.budget])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentageSpent}
                    text={`${percentageSpent}% Gastado`}
                    styles={buildStyles({
                        pathColor: percentageSpent == 100 ? "#DC2626" : "#3b82f6",
                        trailColor: "#F5F5F5",
                        textColor: percentageSpent == 100 ? "#DC2626" : "#3b82f6",
                        textSize: 8
                    })}
                />
            </div>

            <div className="flex flex-col gap-8 items-center justify-center">
                <button
                    onClick={() => dispatch({ type: "reset-app" })}
                    type="button"
                    className="bg-pink-600 text-white w-full p-2 uppercase font-bold rounded-lg"
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={getSpent}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={getAvailable}
                />
            </div>
        </div>
    )
}

export default BudgetTracker