import { Transaction } from "../../application/domain/Transaction";
import { SaveTransactionUseCase } from "../../application/useCases/SaveTransactionUseCase";
import IRepository from "../../output/repositories/IRepository";
import { getLinesAndColumnsFromCSV } from "../adaptersFns/get-lines-and-columns-from-csv";

export class CSVToTransactionAdapter {

    constructor(private source: string, private repository: IRepository<any>) { };

    execute() {
        const data = getLinesAndColumnsFromCSV(this.source);

        const firstEl = Transaction.createFromStringArray(data[0]);

        // Criando um array de transações
        // Filtrando apenas transações da mesma data
        const transactions = data.map(Transaction.createFromStringArray).filter(el => el?.props.date.getDate() == firstEl?.props.date.getDate());

        //Persinsting transactions
        transactions.forEach(el => {
            if (el) {
                new SaveTransactionUseCase(this.repository).execute(el)
            }
        })
    }

}