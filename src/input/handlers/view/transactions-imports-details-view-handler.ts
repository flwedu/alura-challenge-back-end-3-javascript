import { LoadAllTransactionsByImportIdUseCase } from "@src/application/useCases/transactions/load-all-transactions-by-import-id-use-case"
import { LoadTransactionImportByIdUseCase } from "@src/application/useCases/transactions/LoadTransactionImportByIdUseCase"
import { LoadUserByIdUseCase } from "@src/application/useCases/user/LoadUserByIdUseCase"
import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource"
import { Request, Response } from "express"

export const transactionsImportsDetailsViewHandler =
  (repositories: RepositoriesSource) =>
  async (request: Request, response: Response) => {
    const id = request.params.id
    try {
      const transactionsImport = await new LoadTransactionImportByIdUseCase(
        repositories.transactionsImports
      ).execute(id)
      const transactions = await new LoadAllTransactionsByImportIdUseCase(
        repositories.transactions
      ).execute(id)
      const user = await new LoadUserByIdUseCase(repositories.users).execute(
        transactionsImport.userId
      )
      return response.render("details", {
        transactionsImport,
        user,
        transactions,
      })
    } catch (err) {
      return response.redirect("/error")
    }
  }
