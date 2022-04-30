import { Transaction } from "../../../application/domain/Transaction";
import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import { sameDayInCalendar } from "../../../input/utils/date-functions";
import ITransactionRepository from "../ITransactionRepository";

export class InMemoryTransactionRepository implements ITransactionRepository {
    private list: Transaction[];

    constructor() {
        this.list = [];
    }
    async findAll(): Promise<Transaction[]> {
        return Promise.resolve(this.list)
    }
    async findById(id: string): Promise<Transaction> {
        const finded = this.list.find(el => el.id == id)
        if (!finded) throw new ResourceNotFoundError(id)
        return Promise.resolve(finded)
    }
    async findAllByUserId(userId: string): Promise<Transaction[]> {
        return Promise.resolve(this.list.filter(el => el.props.userId == userId))
    }
    async findAllByImportId(importId: string): Promise<Transaction[]> {
        return Promise.resolve(this.list.filter(el => el.props.importId == importId))
    }
    async findAllByDate(date: Date) {
        return Promise.resolve(this.list.filter(el => sameDayInCalendar(el.props.date, date)))
    }
    async save(transaction: Transaction): Promise<string> {

        const oldLength = this.list.length;
        this.list.push(transaction);
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(transaction.id);
        throw new Error("Error saving");
    }
    async saveAll(transactions: Transaction[]) {
        const oldLength = this.list.length;
        this.list.push(...transactions);
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve();
        throw new Error("Error saving");
    }
    async update(transaction: Transaction, id: string): Promise<string> {
        const result = this.list.findIndex((el) => el.id == id);
        if (result < 0) throw new ResourceNotFoundError(id);
        this.list[result] = transaction;
        return Promise.resolve(transaction.id);
    }
    async delete(id: string): Promise<string> {
        const index = this.list.findIndex((el) => el.id == id);
        if (index < 0) throw new ResourceNotFoundError(id);

        this.list.splice(index, 1)
        return Promise.resolve(id);
    }
}
