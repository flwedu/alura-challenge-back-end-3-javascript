import { Request, Response } from "express";
import { LoadAllTransactionsByImportIdUseCase } from "../../application/useCases/transactions/load-all-transactions-by-import-id-use-case";
import { LoadTransactionImportByIdUseCase } from "../../application/useCases/transactions/LoadTransactionImportByIdUseCase";
import { LoadUserByIdUseCase } from "../../application/useCases/user/LoadUserByIdUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";

export class TransactionImportDetailsViewController {

    constructor(private readonly repositories: RepositoriesSource) { };

    async handle(request: Request, response: Response) {

        const id = request.params.id;
        try {
            const transactionsImport = await new LoadTransactionImportByIdUseCase(this.repositories.transactionsImports).execute(id);
            const transactions = await new LoadAllTransactionsByImportIdUseCase(this.repositories.transactions).execute(id)
            const user = await new LoadUserByIdUseCase(this.repositories.users).execute(transactionsImport.userId);
            return response.render("details", { transactionsImport, user, transactions });
        } catch (err) {
            return response.redirect("/error");
        }

    }
}