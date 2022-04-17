import { Transaction } from "../../application/domain/Transaction";
import { getLinesAndColumnsFromCSV } from "../adaptersFns/get-lines-and-columns-from-csv";

export class CSVToTransactionAdapter {

    constructor(private source: string) { };

    async execute() {
        const data = getLinesAndColumnsFromCSV(this.source);

        const firstEl = Transaction.createFromStringArray(data[0]);

        // Criando um array de transações
        // Filtrando apenas transações da mesma data
        // E transações sem campos nulos
        const transactions = data.map(Transaction.createFromStringArray)
            .filter(el => el.props.date.getDate() == firstEl.props.date.getDate()
                && el.props.allFieldsFull
            );
        return transactions;
    }
}