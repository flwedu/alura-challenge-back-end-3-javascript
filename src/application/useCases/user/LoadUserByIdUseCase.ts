import IUserRepository from "../../../output/repositories/IUserRepository";
import { User } from "../../domain/User";

export class LoadUserByIdUseCase {

    constructor(private readonly repository: IUserRepository) { };

    async execute(id: string): Promise<User> {

        return this.repository.findById(id);
    }
}