import { CSVStringToArrayAdapter } from "./CSVStringToArrayAdapter";

describe("CSVStringToArrayAdapter ", () => {

    test("Should parse correclty", () => {

        const input = `1,2,3,4
a,b,c,d`;
        const expected = [["1", "2", "3", "4"], ["a", "b", "c", "d"]];

        const output = new CSVStringToArrayAdapter().createArrayFromData(input);
        expect(expected).toEqual(output);
    })
})