import { Transaction } from "../../application/domain/Transaction";
import { getLinesAndColumnsFromCSV } from "../adaptersFns/get-lines-and-columns-from-csv";

export class CSVToTransactionAdapter {

    constructor(private source: string) { };

    execute(userId: string) {
        const data = getLinesAndColumnsFromCSV(this.source);

        const allTransactions = data.map(line => {
            return this.createTransactionFromLine(line, userId)
        })

        return allTransactions;
    }

    private createTransactionFromLine(source: string[], userId: string) {

        const props = {
            originBankName: source[0],
            originBankAgency: source[1],
            originBankNumber: source[2],
            destinyBankName: source[3],
            destinyBankAgency: source[4],
            destinyBankNumber: source[5],
            value: source[6],
            date: new Date(source[7]),
            allFieldsFull: true,
            userId,
        };

        const entries = Object.entries(props);
        const hasNullField = entries.some(el => {
            const [_, value] = el;
            return (value == null || value == undefined || value == "")
        })
        props.allFieldsFull = !hasNullField;

        return Transaction.create(props);
    }
}
