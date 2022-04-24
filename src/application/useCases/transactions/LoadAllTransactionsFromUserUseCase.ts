import IRepository from "../../../output/repositories/IRepository";
import { TransactionsImport } from "../../domain/TransactionsImport";

export class LoadAllTransactionsImportsFromUserUseCase {

    constructor(private readonly repository: IRepository<TransactionsImport>) { }

    execute(id: string) {

        return this.repository.find({ id });
    }
}