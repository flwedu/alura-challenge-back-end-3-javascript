import mysql2 from "mysql2/promise"
import { TransactionsImport } from "../../../application/domain/TransactionsImport";
import ITransactionImportRepository from "../ITransactionImportRepository";
import { MysqlAdapter } from "./mysql-adapter";

export class MysqlTransactionsImportsRepository implements ITransactionImportRepository {

    private adapter = new MysqlAdapter()

    constructor(private readonly pool: mysql2.Pool) { }

    async findAll(): Promise<TransactionsImport[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<TransactionsImport> {
        throw new Error("Method not implemented.");
    }
    async findAllByUserId(userId: string): Promise<TransactionsImport[]> {
        throw new Error("Method not implemented.");
    }
    async save(transactionImport: TransactionsImport): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async update(transactionImport: TransactionsImport, id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}