import { sameDayInCalendar } from "../../../input/utils/date-functions";
import ITransactionImportRepository from "../../../output/repositories/ITransactionImportRepository";
import ITransactionRepository from "../../../output/repositories/ITransactionRepository";
import { Transaction } from "../../domain/Transaction";

export class RegisterTransactionsUseCase {

    constructor(private readonly transactionsRepository: ITransactionRepository,
        private readonly transactionsImportRepository: ITransactionImportRepository
    ) { }

    async execute(transactions: Transaction[], importId: string) {

        const transactionImport = await this.transactionsImportRepository.findById(importId);

        // Filtrando  apenas transações da mesma data e com todos os campos preenchidos
        const filtredTransactions = transactions.filter(el => {
            return sameDayInCalendar(el.props.date, transactionImport.transactionsDate)
                && el.props.allFieldsFull
        })

        // Saving the importId to each transaction
        if (filtredTransactions.length) {
            filtredTransactions.forEach(el => el.props.importId = importId);
            await this.transactionsRepository.saveAll(filtredTransactions);
        }

        return Promise.resolve();
    }
} 