import IRepository from "../../output/repositories/IRepository";
import { Transaction } from "../domain/Transaction";

export class FindAllFromUserUseCase {

    constructor(private readonly repository: IRepository<Transaction>) { }

    async execute(id: string) {

        return await this.repository.find({ id });
    }
}