import IRepository from "../../../output/repositories/IRepository";
import { User } from "../../domain/User";

export class LoadUserByIdUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(id: string): Promise<User> {

        return this.repository.findById(id);
    }
}