import { Request, Response } from "express";
import { Transaction } from "../../application/domain/Transaction";
import { LoadAllTransactionsFromUser } from "../../application/useCases/transactions/LoadAllTransactionsFromUser";

import IRepository from "../../output/repositories/IRepository";

export class IndexViewController {

    constructor(private readonly repository: IRepository<Transaction>) { };

    async handle(request: Request, response: Response) {
        const transactions = await new LoadAllTransactionsFromUser(this.repository).execute("");
        return response.render("index", { user: "No User", transactions });
    }
}