import { Request, Response } from "express";
import { TransactionsImport } from "../../application/domain/TransactionsImport";
import { User } from "../../application/domain/User";
import { LoadTransactionImportByIdUseCase } from "../../application/useCases/transactions/LoadTransactionImportByIdUseCase";
import { LoadUserByIdUseCase } from "../../application/useCases/user/LoadUserByIdUseCase";

import IRepository from "../../output/repositories/IRepository";

export class TransactionImportDetailsViewController {

    constructor(private readonly transactionRepository: IRepository<TransactionsImport>,
        private readonly userRepository: IRepository<User>
    ) { };

    async handle(request: Request, response: Response) {

        const id = request.params.id;
        try {
            const transactionsImport = await new LoadTransactionImportByIdUseCase(this.transactionRepository).execute(id);
            const user = await new LoadUserByIdUseCase(this.userRepository).execute(transactionsImport.userId);
            return response.render("details", { transactionsImport, user });
        } catch (err) {
            return response.redirect("/error");
        }

    }
}