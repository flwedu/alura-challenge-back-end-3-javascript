import { Request, Response } from "express";
import { TransactionsImport } from "../../application/domain/TransactionsImport";
import { LoadAllTransactionsImportsFromUserUseCase } from "../../application/useCases/transactions/LoadAllTransactionsFromUserUseCase";

import IRepository from "../../output/repositories/IRepository";

export class HomeViewController {

    constructor(private readonly repository: IRepository<TransactionsImport>) { };

    async handle(request: Request, response: Response) {
        const session = request.session;
        //@ts-ignore
        const transactionsImports = await new LoadAllTransactionsImportsFromUserUseCase(this.repository).execute(session.userId);

        return response.render("home", { transactionsImports: transactionsImports });
    }
}