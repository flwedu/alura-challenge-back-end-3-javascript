import { Transaction } from "../../application/domain/Transaction";
import { getLinesAndColumnsFromCSV } from "../adaptersFns/get-lines-and-columns-from-csv";

export class CSVToTransactionAdapter {

    constructor(private source: string) { };

    execute() {
        const data = getLinesAndColumnsFromCSV(this.source);

        const firstEl = Transaction.createFromStringArray(data[0]);

        // Criando um array de transações
        // Filtrando apenas transações da mesma data
        const transactions = data.map(Transaction.createFromStringArray).filter(el => el?.props.date.getDate() == firstEl?.props.date.getDate());

        console.log(transactions);
    }
}