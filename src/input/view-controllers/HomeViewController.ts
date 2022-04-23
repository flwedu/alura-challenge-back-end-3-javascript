import { Request, Response } from "express";
import { Transaction } from "../../application/domain/Transaction";
import { LoadAllTransactionsFromUserUseCase } from "../../application/useCases/transactions/LoadAllTransactionsFromUserUseCase";
import IRepository from "../../output/repositories/IRepository";

export class HomeViewController {

    constructor(private readonly repository: IRepository<Transaction>) { };

    async handle(request: Request, response: Response) {
        const session = request.session;
        //@ts-ignore
        const transactions = await new LoadAllTransactionsFromUserUseCase(this.repository).execute(session.userId);

        return response.render("home", { transactions });
    }
}