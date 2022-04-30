import { Transaction } from "../../application/domain/Transaction";

export default interface ITransactionRepository {

    findAll(): Promise<Transaction[]>
    findById(id: string): Promise<Transaction>
    findAllByUserId(userId: string): Promise<Transaction[]>
    findAllByImportId(importId: string): Promise<Transaction[]>
    findAllByDate(date: Date): Promise<Transaction[]>
    save(transaction: Transaction): Promise<string>
    saveAll(transactions: Transaction[]): Promise<void>
    update(transaction: Transaction, id: string): Promise<string>
    delete(id: string): Promise<string>
}