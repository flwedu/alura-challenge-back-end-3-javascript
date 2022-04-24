import IRepository from "../../../output/repositories/IRepository";
import { Transaction } from "../../domain/Transaction";
import { TransactionsImport } from "../../domain/TransactionsImport";

export default class RegisterTransactionsImportUseCase {

    constructor(private readonly repository: IRepository<TransactionsImport>) { }

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

        return this.repository.save(transactionImport);
    }
}