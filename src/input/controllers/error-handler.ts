import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err) {
        const errorCode = ErrorCode[err.name];
        if (errorCode) {
            res.status(errorCode).render("error", { error: err, errorCode });
        }
        else res.render("error", { error: err, errorCode: 500 });
    }
    else {
        next();
    }
}

const ErrorCode = {
    "ResourceNotFoundError": 404,
    "BusinessRuleError": 400
} as { [index: string]: number }