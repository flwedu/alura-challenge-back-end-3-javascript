import fs from "fs";
import { Request, Response } from "express";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";
import IRepository from "../../output/repositories/IRepository";
import { SaveTransactionUseCase } from "../../application/useCases/SaveTransactionUseCase";

export class FileInputController {

    constructor(private repository: IRepository<any>) { }

    async handle(request: Request, response: Response) {

        console.log(request.file);

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource);
            const transactionsList = await adapter.execute();
            const savedIds = [];

            for (let transaction of transactionsList) {
                const savedId = await new SaveTransactionUseCase(this.repository).execute(transaction);
                savedIds.push(savedId);
            }

            fs.rm(request.file.path, (err) => console.error("error deleting upload: " + err));
            return response.redirect("/");
            // return response.json(`Saved transaction ids: \n ${savedIds}`).status(201);
        }

        return response.json({ message: "No file uploaded" }).status(400)
    }
}