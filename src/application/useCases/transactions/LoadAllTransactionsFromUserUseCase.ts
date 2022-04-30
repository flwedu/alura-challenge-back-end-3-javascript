import ITransactionImportRepository from "../../../output/repositories/ITransactionImportRepository";

export class LoadAllTransactionsImportsFromUserUseCase {

    constructor(private readonly repository: ITransactionImportRepository) { }

    execute(userId: string) {

        return this.repository.findAllByUserId(userId);
    }
}