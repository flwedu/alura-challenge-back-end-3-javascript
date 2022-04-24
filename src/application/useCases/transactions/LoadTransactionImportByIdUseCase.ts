import IRepository from "../../../output/repositories/IRepository";
import { TransactionsImport } from "../../domain/TransactionsImport";

export class LoadTransactionImportByIdUseCase {

    constructor(private readonly repository: IRepository<TransactionsImport>) { }

    execute(id: string) {

        return this.repository.findById(id);
    }
}