import { TransactionsImport } from "../../../application/domain/TransactionsImport";
import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import ITransactionImportRepository from "../ITransactionImportRepository";

export class InMemoryTransactionImportRepository implements ITransactionImportRepository {

    private list: TransactionsImport[];

    constructor() {
        this.list = [];
    }

    async findAll(): Promise<TransactionsImport[]> {
        return Promise.resolve(this.list)
    }
    async findById(id: string): Promise<TransactionsImport> {
        const finded = this.list.find(el => el.id == id)
        if (!finded) throw new ResourceNotFoundError(id)
        return Promise.resolve(finded)
    }
    async findAllByUserId(userId: string): Promise<TransactionsImport[]> {
        return Promise.resolve(this.list.filter(el => el.userId == userId))
    }

    async save(transactionImport: TransactionsImport): Promise<string> {
        const oldLength = this.list.length;
        this.list.push(transactionImport);
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(transactionImport.id);
        throw new Error("Error saving");
    }
    async update(transactionImport: TransactionsImport, id: string): Promise<string> {
        const result = this.list.findIndex((el) => el.id == id);
        if (result < 0) throw new ResourceNotFoundError(id);
        this.list[result] = transactionImport;
        return Promise.resolve(transactionImport.id);
    }
    async delete(id: string): Promise<string> {
        const index = this.list.findIndex((el) => el.id == id);
        if (index < 0) throw new ResourceNotFoundError(id);

        this.list.splice(index, 1)
        return Promise.resolve(id);
    }
    ;
}