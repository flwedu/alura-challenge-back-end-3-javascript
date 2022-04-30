import { Request, Response } from "express";
import fs from "fs";
import { RegisterTransactionsUseCase } from "../../application/useCases/transactions/register-transactions-use-case";
import RegisterTransactionsImportUseCase from "../../application/useCases/transactions/RegisterTransactionsImportUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";

export class FileInputController {

    constructor(private repositories: RepositoriesSource) { }

    async handle(request: Request, response: Response) {

        //@ts-ignore
        const userId: string = request.session.userId;

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource);

            const transactions = adapter.execute(userId);
            const firstTransactionDate = transactions[0].props.date;

            // Get Import id after persisting
            const importId = await new RegisterTransactionsImportUseCase(this.repositories.transactionsImports).execute(userId, firstTransactionDate);

            await new RegisterTransactionsUseCase(this.repositories.transactions, this.repositories.transactionsImports).execute(transactions, importId);

            fs.rm(request.file.path, (err) => {
                if (err) {
                    console.error("error deleting upload: " + err);
                }
                return;
            });
        }
        return response.redirect("/");
    }
}