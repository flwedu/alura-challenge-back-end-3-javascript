import fs from "fs";
import { Request, Response } from "express";
import { CSVToTransactionAdapter } from "../adapters/CSVToTransactionAdapter";

export class FileInputExpressController {

    handle(request: Request, response: Response) {

        console.log(request.file);

        if (request.file) {
            const fileSource = fs.readFileSync(request.file.path, { encoding: "utf8" });
            const adapter = new CSVToTransactionAdapter(fileSource);
            adapter.execute();
        }

        return response.json({ message: "No file uploaded" })
    }
}