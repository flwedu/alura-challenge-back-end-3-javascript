import IRepository from "../../../output/repositories/IRepository";
import { Transaction } from "../../domain/Transaction";

export class LoadAllTransactionsFromUserUseCase {

    constructor(private readonly repository: IRepository<Transaction>) { }

    execute(id: string) {

        return this.repository.find({ id });
    }
}