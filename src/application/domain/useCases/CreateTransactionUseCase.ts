import IRepository from "../../../output/repositories/IRepository";
import { Transaction, TransactionProps } from "../Transaction";

export type TransactionInput = {
    id?: string,
    props: TransactionProps
}

export class CreateTransactionUseCase {

    constructor(private readonly repository: IRepository<Transaction>) { };

    async execute(data: TransactionInput) {

        const transaction = Transaction.create(data.props, data.id);
        return await this.repository.save(transaction);
    }
}