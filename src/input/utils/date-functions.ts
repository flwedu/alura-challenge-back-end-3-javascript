export function extractDate(date: Date) {

    return date.toISOString().split("T")[0]
}

export function sameDayInCalendar(date1: Date, date2: Date) {

    return extractDate(date1) == extractDate(date2)
}