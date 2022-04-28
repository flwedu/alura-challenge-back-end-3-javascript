import { Transaction } from "../../../application/domain/Transaction";
import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import IRepository from "../IRepository";

export class InMemoryTransactionRepository implements IRepository<Transaction>{

    public list: Transaction[];

    constructor() {
        this.list = [];
    };

    async findOne(query: { [index: string]: any }) {

        const entries = Object.entries(query);
        const finded = this.list.find(el => {
            return entries.some(entry => {
                const [key, value] = entry;
                //@ts-ignore
                if (el.props[key] == value) return true;
                return false;
            })
        })
        if (!finded) throw new ResourceNotFoundError();
        return Promise.resolve(finded);
    };

    async save(entity: Transaction) {

        const oldLength = this.list.length;
        this.list.push({ ...entity });
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(entity.id);
        throw new Error("Error saving");
    };
    async findById(id: string) {
        const result = this.list.find(el => el.id == id);
        if (!result) throw new ResourceNotFoundError();
        return Promise.resolve(result);
    };
    async find(query?: any) {
        return Promise.resolve(this.list);
    };
    async update(entity: Transaction, id: string) {
        const result = this.list.findIndex(el => el.id == id);
        if (result < 0) throw new ResourceNotFoundError(id);
        this.list[result] = entity;
        return Promise.resolve(id);
    };
    async delete(id: string) {
        const index = this.list.findIndex(el => el.id == id);
        if (index < 0) throw new ResourceNotFoundError(id);
        this.list.splice(index, 1);
        return Promise.resolve(id);
    };

}