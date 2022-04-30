import { Request, Response } from "express";
import fs from "fs";
import RegisterTransactionsImportUseCase from "../../application/useCases/transactions/RegisterTransactionsImportUseCase";
import { RepositoriesSource } from "../../output/repositories/RepositoriesSource";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";

export class FileInputController {

    constructor(private repositories: RepositoriesSource) { }

    async handle(request: Request, response: Response) {

        //@ts-ignore
        const userId = request.session.userId;

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource);
            const transactions = adapter.execute(userId);

            await new RegisterTransactionsImportUseCase(this.repositories.transactionsImports, this.repositories.transactions).execute({ userId, transactions })

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