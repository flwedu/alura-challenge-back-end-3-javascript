import ITransactionImportRepository from "../../../output/repositories/ITransactionImportRepository"

export class LoadTransactionImportByIdUseCase {
  constructor(private readonly repository: ITransactionImportRepository) {}

  execute(id: string) {
    return this.repository.findById(id)
  }
}
