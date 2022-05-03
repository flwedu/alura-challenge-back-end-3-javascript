import ITransactionRepository from "../../../output/repositories/ITransactionRepository"

export class LoadAllTransactionsByImportIdUseCase {
  constructor(private readonly repository: ITransactionRepository) {}

  execute(importId: string) {
    return this.repository.findAllByImportId(importId)
  }
}
