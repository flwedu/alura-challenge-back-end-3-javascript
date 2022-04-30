import { extractDate, sameDayInCalendar } from "./date-functions"

describe('Date functions test', () => {

    test.each`
                        date                  |  expected
    ${new Date(2022, 0, 1)} | ${"2022-01-01"}
    ${new Date(2022, 1, 1)} | ${"2022-02-01"}
    ${new Date(1, 11, 15)} | ${"1901-12-15"}
    `("extractDate should get $expected to the date of $date", ({ date, expected }) => {

        const extractedDate = extractDate(date)

        expect(extractedDate).toEqual(expected)
    })

    test.each`
                        date1                 |  date2
    ${new Date(2022, 0, 1)} | ${new Date(2022, 0, 1)}
    ${new Date(2077, 4, 1)} | ${new Date(2077, 4, 1)}
    `("sameDayInCalendar should return true to $date1 and $date2", ({ date1, date2 }) => {

        expect(sameDayInCalendar(date1, date2)).toBeTruthy()
    })

    test.each`
                        date1                 |  date2
    ${new Date(2022, 0, 1)} | ${new Date(2022, 1, 1)}
    ${new Date(2077, 4, 1)} | ${new Date(2078, 4, 1)}
    `("sameDayInCalendar should return false to $date1 and $date2", ({ date1, date2 }) => {

        expect(sameDayInCalendar(date1, date2)).toBeFalsy()
    })
})