import IUserRepository from "../../../output/repositories/IUserRepository";
import { User } from "../../domain/User";

export class LoadAllUsersUseCase {

    constructor(private readonly repository: IUserRepository) { };

    async execute(): Promise<User[]> {

        const users = await this.repository.findAll();
        return Promise.resolve(users);
    }
}