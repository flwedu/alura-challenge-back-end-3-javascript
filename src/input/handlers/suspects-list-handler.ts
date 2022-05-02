import { Request, Response } from "express";
import { LoadAllSuspectTransactionsUseCase } from "../../application/useCases/transactions/LoadAllSuspectTransactionsUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";

export const suspectsListHandler = (repositories: RepositoriesSource) => {

    return async (request: Request, response: Response) => {

        const date = request.body.date

        const transactions = await new LoadAllSuspectTransactionsUseCase(repositories.transactions).execute(date) || []
        // TODO: add use case for loading suspects accounts
        let accounts: any[] = []
        // TODO:  add use case for loading suspects agencies
        let agencies: any[] = []

        response.render("suspects", { transactions, accounts, agencies })
    }
}