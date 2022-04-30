import { Transaction } from "../../application/domain/Transaction";

export default interface ITransactionRepository {

    findAll(): Promise<Transaction[]>
    findById(id: string): Promise<Transaction>
    findAllByUserId(userId: string): Promise<Transaction[]>
    findAllByImportId(importId: string): Promise<Transaction[]>
    save(transaction: Transaction): Promise<string>
    update(transaction: Transaction, id: string): Promise<string>
    delete(id: string): Promise<string>
}