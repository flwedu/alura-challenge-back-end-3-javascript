import { hashPassword } from "../../../util/password-encrypt";
import IRepository from "../IRepository";

export class InMemoryRepository<T> implements IRepository<T>{

    public list: any[];

    constructor() {
        this.list = [];
    };

    async findOne(query: any) {

        const entries = Object.entries(query);
        const finded = this.list.find(el => {
            return entries.some(entry => {
                const [key, value] = entry;
                if (el[key] == value) return true;
                return false;
            })
        })
        if (finded) return Promise.resolve(finded);
        return Promise.reject("No element found");
    };

    async save(entity: any) {

        const find = this.list.findIndex(el => el.email == entity.email);
        if (find > -1) return Promise.reject("Email already registred");

        // Hash password
        const password = await hashPassword(entity.password);

        const oldLength = this.list.length;
        this.list.push({ ...entity, password });
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(entity.id);
        return Promise.reject("Error saving")
    };
    async findById(id: string) {
        const result = this.list.find(el => el.id == id);
        if (!result) return Promise.reject("Id not found");
        return Promise.resolve(result);
    };
    async find(query?: any) {
        return Promise.resolve(this.list);
    };
    async update(entity: T, id: string) {
        const result = this.list.findIndex(el => el.id == id);
        if (result < 0) return Promise.reject("Id not found");
        this.list[result] = entity;
        return Promise.resolve(id);
    };
    async delete(id: string) {
        const index = this.list.findIndex(el => el.id == id);
        if (index < 0) return Promise.reject("Id not found");
        this.list.splice(index, 1);
        return Promise.resolve(id + " deleted");
    };

}