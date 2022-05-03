import ITransactionImportRepository from "../../../output/repositories/ITransactionImportRepository"
import { TransactionsImport } from "../../domain/TransactionsImport"

export default class RegisterTransactionsImportUseCase {
  constructor(
    private readonly transactionImportRepository: ITransactionImportRepository
  ) {}

  async execute(userId: string, transactionsDate: Date) {
    const transactionImport = TransactionsImport.create({
      transactionsDate,
      userId,
    })

    const transactionImportId = await this.transactionImportRepository.save(
      transactionImport
    )
    return transactionImportId
  }
}
