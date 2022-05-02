import { LoadAllTransactionsImportsFromUserUseCase } from "@src/application/useCases/transactions/LoadAllTransactionsFromUserUseCase";
import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource";
import { Request, Response } from "express";

export const homeViewHandler = (repositories: RepositoriesSource) =>

    async (request: Request, response: Response) => {

        const session = request.session;
        //@ts-ignore
        const transactionsImports = await new LoadAllTransactionsImportsFromUserUseCase(repositories.transactionsImports).execute(session.userId);

        response.render("home", { transactionsImports: transactionsImports });
    }
