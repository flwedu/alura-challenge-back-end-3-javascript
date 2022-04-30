import { User } from "../../../application/domain/User";
import BusinessRuleError from "../../../application/errors/BusinessRuleError";
import { ErrorMessage } from "../../../application/errors/ErrorMessage";
import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import IUserRepository from "../IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
    private list: User[];

    constructor() {
        this.list = [];
    }

    async save(user: User) {
        const find = this.list.findIndex((el) => el.email == user.email);
        if (find > -1)
            throw new BusinessRuleError(ErrorMessage.ALREADY_REGISTRED("Email"));

        const oldLength = this.list.length;
        this.list.push(user);
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(user.id);
        throw new Error("Error saving");
    }

    async findById(id: string) {
        const result = this.list.find((el) => el.id == id);
        if (!result) throw new ResourceNotFoundError(id);
        return Promise.resolve(result);
    }

    async findAll(): Promise<User[]> {
        return Promise.resolve(this.list);
    }

    async findByEmail(email: string): Promise<User> {
        const finded = this.list.find((el) => el.email == email);
        if (!finded) throw new ResourceNotFoundError();
        return Promise.resolve(finded);
    }

    async update(user: User, id: string) {
        const result = this.list.findIndex((el) => el.id == id);
        if (result < 0) throw new ResourceNotFoundError(id);
        this.list[result] = user;
        return Promise.resolve(id);
    }
    async delete(id: string) {
        const index = this.list.findIndex((el) => el.id == id);
        if (index < 0) throw new ResourceNotFoundError(id);

        const user = this.list[index];
        user.active = false;
        return Promise.resolve(user.id);
    }
}
