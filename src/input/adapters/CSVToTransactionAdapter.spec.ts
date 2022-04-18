import { CSVToTransactionAdapter } from "./CSVToTransactionAdapter";

test('should return a array with one transaction', () => {

    const input = `BANCO DO BRASIL,0001,00001-1,BANCO BRADESCO,0001,00001-1,8000,2022-01-01T07:30:00`
    const adapter = new CSVToTransactionAdapter(input);

    const result = adapter.execute();

    expect(result[0]).toMatchObject({
        "props": {
            originBankName: "BANCO DO BRASIL",
            originBankAgency: "0001",
            originBankNumber: "00001-1",
            destinyBankName: "BANCO BRADESCO",
            destinyBankAgency: "0001",
            destinyBankNumber: "00001-1",
            value: "8000",
            date: new Date("2022-01-01T07:30:00"),
            allFieldsFull: true
        }
    })
})

test('should return only 1 transaction when the second has a different date', () => {

    const input = `BANCO DO BRASIL,0001,00001-1,BANCO BRADESCO,0001,00001-1,8000,2022-01-01T07:30:00
BANCO DO BRASIL,0001,00001-1,BANCO BRADESCO,0001,00001-1,8000,2022-01-02T07:30:00`
    const adapter = new CSVToTransactionAdapter(input);

    const result = adapter.execute();

    expect(result.length).toEqual(1);
})

test('should return only transactions without empty fields when the second has a different date', () => {

    const input = `BANCO DO BRASIL,,00001-1,BANCO BRADESCO,0001,00001-1,8000,2022-01-01T07:30:00
BANCO DO BRASIL,0001,00001-1,BANCO BRADESCO,0001,00001-1,,2022-01-02T07:30:00`
    const adapter = new CSVToTransactionAdapter(input);

    const result = adapter.execute();

    expect(result.length).toEqual(0);
})