//@ts-nocheck
import mysql2 from "mysql2/promise"
import { Transaction } from "../../../application/domain/Transaction";
import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import ITransactionRepository from "../ITransactionRepository";
import { MysqlAdapter } from "./mysql-adapter";

export class MysqlTransactionsRepository implements ITransactionRepository {

    private adapter = new MysqlAdapter()

    constructor(private readonly pool: mysql2.Pool) { }

    async findAll(): Promise<Transaction[]> {
        const [rows, _] = await this.pool.query("SELECT * FROM transactions")
        const transactions = rows.map(this.adapter.toTransaction)
        return Promise.resolve(transactions)
    }
    async findById(id: string): Promise<Transaction> {
        const [rows, _] = await this.pool.query("SELECT * FROM transactions WHERE id = ?", [id])
        if (!rows.length) throw new ResourceNotFoundError(id)
        const transaction = this.adapter.toTransaction(rows)
        return Promise.resolve(transaction)
    }
    async findAllByUserId(userId: string): Promise<Transaction[]> {
        const [rows, _] = await this.pool.query("SELECT * FROM transactions WHERE userId = ?", [userId])
        const transactions = rows.map(this.adapter.toTransaction)
        return Promise.resolve(transactions)
    }
    async findAllByImportId(importId: string): Promise<Transaction[]> {
        const [rows, _] = await this.pool.query("SELECT * FROM transactions WHERE importId = ?", [importId])
        const transactions = rows.map(this.adapter.toTransaction)
        return Promise.resolve(transactions)
    }
    async findAllByDate(date: Date): Promise<Transaction[]> {
        const [rows, _] = await this.pool.query("SELECT * FROM transactions WHERE date = ?", [date])
        const transactions = rows.map(this.adapter.toTransaction)
        return Promise.resolve(transactions)
    }
    async findAllByMinimumValue(minValue: number, date: Date): Promise<Transaction[]> {
        const [rows, _] = await this.pool.query("SELECT * FROM transactions WHERE value > ? AND date = ?", [minValue, date])
        const transactions = rows.map(this.adapter.toTransaction)
        return Promise.resolve(transactions)
    }
    // id, transactionDate, value, originBankName, originBankAgency, originBankName, destinyBankName, destinyBankAgency, destinyBankName, userId, importId
    async save(transaction: Transaction): Promise<string> {
        const [rows, _] = await this.connection.query("INSERT INTO transactions SET ?", this.adapter.toTransactionQuery(transaction))
        const saved = this.adapter.toTransaction(row)
        return Promise.resolve(saved.id)
    }
    async saveAll(transactions: Transaction[]): Promise<void> {

        const [rows, _] = await this.connection.query("INSERT INTO transactions (id, transactionDate, value, originBankName, originBankAgency, originBankName, destinyBankName, destinyBankAgency, destinyBankName, userId, importId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.adapter.toTransactionQuery(transaction)])
        const saved = this.adapter.toTransaction(row)
        return Promise.resolve(saved.id)
    }
    async update(transaction: Transaction, id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<string> {
        await this.connection.query("DELETE FROM transactions WHERE id = ?", [id])
    }


}