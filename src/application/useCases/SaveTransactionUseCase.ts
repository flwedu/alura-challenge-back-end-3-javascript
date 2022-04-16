import IRepository from "../../output/repositories/IRepository";
import { Transaction } from "../domain/Transaction";

export class SaveTransactionUseCase {

    constructor(private readonly repository: IRepository<Transaction>) { };

    async execute(transaction: Transaction) {

        return await this.repository.save(transaction);
    }
}