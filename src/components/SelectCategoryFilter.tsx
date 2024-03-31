import { Dispatch, Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { categories } from '../data/categories'
import { BudgetActions } from '../reducers/budget-reducer'
import { useBudget } from '../hooks/useBudget'
import { Category } from '../types/types'


type ExampleProps = {
    dispatch: Dispatch<BudgetActions>
}

export default function Example({dispatch}: ExampleProps) {
  const [categoryId, setCategoryId] = useState("")
  const { state } = useBudget()

  let activeCategories: Category[] = []
  categories.forEach((cat) => {
    if(state.expenses.some(exp => exp.category == cat.id)){
        activeCategories = [...activeCategories, cat]
    }
  })

  const categoryInfo = useMemo(() => categories.find(cat => cat.id == categoryId), [categoryId])

  const handleChange = (value:string) =>{
    setCategoryId(value)
  }

  useEffect(() => {
    dispatch({ type: "add-filter-category", payload: { id: categoryId } })
  }, [categoryId])

  return (
    <div className="flex-1">
      <Listbox value={categoryId} onChange={handleChange}>
        <div className="">
          <Listbox.Button className="relative w-full cursor-default bg-slate-100 p-2 rounded-md text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{categoryInfo?.name || "Todas las categorias"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                <Listbox.Option
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`}
                    value={""}
                >
                    {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        -- Seleccione --
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              {activeCategories.map(cat => (
                <Listbox.Option
                  key={cat.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ?'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={cat.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {cat.name}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
