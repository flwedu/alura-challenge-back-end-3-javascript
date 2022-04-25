import { User } from "../../../application/domain/User";
import BusinessRuleError from "../../../application/errors/BusinessRuleError";
import { ErrorMessage } from "../../../application/errors/ErrorMessage";
import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
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
        if (!finded) throw new ResourceNotFoundError();
        return Promise.resolve(finded);
    };

    async save(entity: User) {

        const find = this.list.findIndex(el => el.email == entity.email);
        if (find > -1) throw new BusinessRuleError(ErrorMessage.ALREADY_REGISTRED("Email"));

        const oldLength = this.list.length;
        this.list.push(entity);
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(entity.id);
        throw new Error("Error saving");
    };
    async findById(id: string) {
        const result = this.list.find(el => el.id == id);
        if (!result) throw new ResourceNotFoundError(id);
        return Promise.resolve(result);
    };
    async find(query?: any) {
        return Promise.resolve(this.list);
    };
    async update(entity: User, id: string) {
        const result = this.list.findIndex(el => el.id == id);
        if (result < 0) throw new ResourceNotFoundError(id);
        this.list[result] = entity;
        return Promise.resolve(id);
    };
    async delete(id: string) {
        const index = this.list.findIndex(el => el.id == id);
        if (index < 0) throw new ResourceNotFoundError(id);

        const user = this.list[index];
        user.active = false;
        return Promise.resolve(user.id);
    };

}