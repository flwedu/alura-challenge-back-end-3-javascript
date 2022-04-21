import { User } from "../../../application/domain/User";
import IRepository from "../IRepository";

export class InMemoryUserRepository implements IRepository<User>{

    public list: User[];

    constructor() {
        this.list = [];
    };

    async findOne(query: { email?: string, name?: string }) {

        const entries = Object.entries(query);
        const finded = this.list.find(el => {
            return entries.some(entry => {
                const [key, value] = entry;
                //@ts-ignore
                return (el[key] == value);
            })
        })
        if (finded) return Promise.resolve(finded);
        return Promise.reject("No element found");
    };

    async save(entity: User) {

        const find = this.list.findIndex(el => el.email == entity.email);
        if (find > -1) return Promise.reject("Email already registred");

        const oldLength = this.list.length;
        this.list.push(entity);
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
    async update(entity: User, id: string) {
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