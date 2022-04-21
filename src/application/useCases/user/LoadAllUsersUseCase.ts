import IRepository from "../../../output/repositories/IRepository";
import { User } from "../../domain/User";

export class LoadAllUsersUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(): Promise<User[]> {

        const users = await this.repository.find();
        return Promise.resolve(users);
    }
}