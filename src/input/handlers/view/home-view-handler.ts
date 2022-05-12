//@ts-nocheck
import { Request, Response } from "express"
import { LoadAllTransactionsImportsFromUserUseCase } from "../../../application/useCases/transactions/LoadAllTransactionsFromUserUseCase"
import { RepositoriesSource } from "../../../output/repositories/RepositoriesSource"

export const homeViewHandler =
  (repositories: RepositoriesSource) =>
  async (request: Request, response: Response) => {
    const session = request.session
    const transactionsImports =
      await new LoadAllTransactionsImportsFromUserUseCase(
        repositories.transactionsImports
      ).execute(session.userId)

    response.render("home", { transactionsImports: transactionsImports })
  }
