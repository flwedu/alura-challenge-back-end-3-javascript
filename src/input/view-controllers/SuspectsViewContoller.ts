import { Request, Response } from "express";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";

export class SuspectsViewController {

    constructor(private readonly repositories: RepositoriesSource) { };

    async handle(request: Request, response: Response) {

        const transactions = await this.repositories.transactions.findAll();
        return response.render("suspects", { transactions });
    }
}