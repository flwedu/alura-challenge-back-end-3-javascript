import { TransactionsImport } from "../../application/domain/TransactionsImport";

export default interface ITransactionImportRepository {

    findAll(): Promise<TransactionsImport[]>
    findById(id: string): Promise<TransactionsImport>
    findAllByUserId(userId: string): Promise<TransactionsImport[]>
    save(transactionImport: TransactionsImport): Promise<string>
    update(transactionImport: TransactionsImport, id: string): Promise<string>
    delete(id: string): Promise<string>
}