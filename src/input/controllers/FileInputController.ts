import { Request, Response } from "express";
import fs from "fs";
import { TransactionsImport } from "../../application/domain/TransactionsImport";
import RegisterTransactionsImportUseCase from "../../application/useCases/transactions/RegisterTransactionsImportUseCase";
import IRepository from "../../output/repositories/IRepository";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";

export class FileInputController {

    constructor(private repository: IRepository<TransactionsImport>) { }

    async handle(request: Request, response: Response) {

        //@ts-ignore
        const userId = request.session.userId;

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource);
            const transactions = adapter.execute(userId);

            await new RegisterTransactionsImportUseCase(this.repository).execute({ userId, transactions })

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