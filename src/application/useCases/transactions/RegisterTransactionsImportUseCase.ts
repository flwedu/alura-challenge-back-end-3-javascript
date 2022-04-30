import ITransactionImportRepository from "../../../output/repositories/ITransactionImportRepository";
import ITransactionRepository from "../../../output/repositories/ITransactionRepository";
import { Transaction } from "../../domain/Transaction";
import { TransactionsImport } from "../../domain/TransactionsImport";

export default class RegisterTransactionsImportUseCase {

    constructor(private readonly transactionImportRepository: ITransactionImportRepository,
        private readonly transactionRepository: ITransactionRepository) { }

    async execute(props: { userId: string, transactions: Transaction[] }) {

        const onlyFilled = props.transactions.filter(el => el.props.allFieldsFull)
        const firstTransaction = onlyFilled[0];
        const sameDateTransactions = onlyFilled.filter(
            el => el.props.date.getDate() == firstTransaction.props.date.getDate());

        const transactionImport = TransactionsImport.create({
            transactions: sameDateTransactions,
            transactionsDate: firstTransaction.props.date,
            userId: props.userId
        });

        const transactionImportId = await this.transactionImportRepository.save(transactionImport);
        // Add importId to each transaction
        props.transactions.forEach(async (transaction) => {
            transaction.props.importId = transactionImportId
            await this.transactionRepository.save(transaction)
        });
        return transactionImportId;
    }
}