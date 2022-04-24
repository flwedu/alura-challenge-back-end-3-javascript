import crypto from "crypto";
import { Transaction } from "./Transaction"
import { User } from "./User"

export type TransactionsImportProps = {
    transactionsDate: Date
    userId: string
    transactions: Transaction[]
}

export class TransactionsImport {

    public id: string
    public date: Date
    public transactionsDate: Date
    public userId: string
    public transactions: Transaction[]

    private constructor(props: TransactionsImportProps) {
        this.id = crypto.randomUUID();
        this.date = new Date();
        this.transactionsDate = props.transactionsDate;
        this.userId = props.userId;
        this.transactions = props.transactions;
    };

    static create(props: TransactionsImportProps) {
        return new TransactionsImport(props);
    }
}