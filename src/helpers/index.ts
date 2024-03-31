export const cashify = (amount: number) =>{
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}

export const formatDate = (date: string) : string =>{
    const dateObj = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return dateObj.toLocaleString('es-MX', options)
}