import { getLinesAndColumnsFromCSV } from "./get-lines-and-columns-from-csv"

test('should return the right values', () => {

    const input = `BANCO DO BRASIL,0001,00001-1,BANCO BRADESCO,0001,00001-1,8000,2022-01-01T07:30:00
BANCO SANTANDER,0001,00001-1,BANCO BRADESCO,0001,00001-1,210,2022-01-01T08:12:00`
    const expected = [
        ["BANCO DO BRASIL", "0001", "00001-1", "BANCO BRADESCO", "0001", "00001-1", "8000", "2022-01-01T07:30:00"],
        ["BANCO SANTANDER", "0001", "00001-1", "BANCO BRADESCO", "0001", "00001-1", "210", "2022-01-01T08:12:00"]
    ]
    const response = getLinesAndColumnsFromCSV(input);

    expect(response).toStrictEqual(expected);
})