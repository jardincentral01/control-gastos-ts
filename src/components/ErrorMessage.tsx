import { PropsWithChildren } from "react"

function ErrorMessage({children}: PropsWithChildren) {
    return (
        <div className={`bg-red-500 w-full p-3 rounded-md shadow text-center font-bold text-white uppercase transition-all ${children ? "opacity-100" : "opacity-0"}`}>{children}</div>
    )
}

export default ErrorMessage