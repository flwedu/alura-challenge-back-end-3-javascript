import fs from "fs";
import { Request, Response } from "express";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";
import IRepository from "../../output/repositories/IRepository";
import { SaveTransactionUseCase } from "../../application/useCases/transactions/SaveTransactionUseCase";
import { Transaction } from "../../application/domain/Transaction";

export class FileInputController {

    constructor(private repository: IRepository<Transaction>) { }

    async handle(request: Request, response: Response) {

        const userId = request.params.userId;

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource);
            const transactionsList = adapter.execute(userId);

            for (let transaction of transactionsList) {
                await new SaveTransactionUseCase(this.repository).execute(transaction);
            }

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