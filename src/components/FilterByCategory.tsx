import SelectCategoryFilter from "./SelectCategoryFilter"
import { useBudget } from "../hooks/useBudget"

function FilterByCategory() {

    const { dispatch } = useBudget()

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="w-full relative flex items-center gap-5">
                    <label className="text-lg">Filtrar Gastos: </label>
                    <SelectCategoryFilter
                        dispatch={dispatch}
                    />
                </div>
            </form>
        </div>
    )
}

export default FilterByCategory