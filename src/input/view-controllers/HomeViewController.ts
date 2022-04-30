import { Request, Response } from "express";
import { LoadAllTransactionsImportsFromUserUseCase } from "../../application/useCases/transactions/LoadAllTransactionsFromUserUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";


export class HomeViewController {

    constructor(private readonly repositories: RepositoriesSource) { };

    async handle(request: Request, response: Response) {
        const session = request.session;
        //@ts-ignore
        const transactionsImports = await new LoadAllTransactionsImportsFromUserUseCase(this.repositories.transactionsImports).execute(session.userId);

        return response.render("home", { transactionsImports: transactionsImports });
    }
}