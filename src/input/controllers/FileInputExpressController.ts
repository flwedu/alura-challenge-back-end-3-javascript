import { Request, Response } from "express";

export class FileInputExpressController {

    handle(request: Request, response: Response) {

        console.log(request.file);

        if (request.file) {
            return response.json({ message: `one file uploaded, with name: ${request.file.originalname} and ${request.file.size} bits` });
        }
        return response.json({ message: "No file uploaded" })
    }
}