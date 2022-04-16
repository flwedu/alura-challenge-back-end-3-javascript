import fs from "fs";
import { Request, Response } from "express";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";
import IRepository from "../../output/repositories/IRepository";

export class FileInputController {

    constructor(private repository: IRepository<any>) { }

    async handle(request: Request, response: Response) {

        console.log(request.file);

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource, this.repository);
            adapter.execute();
            return response.json({ message: "New Transactions saved" });
        }

        return response.json({ message: "No file uploaded" })
    }
}