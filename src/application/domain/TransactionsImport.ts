import crypto from "crypto";

export type TransactionsImportProps = {
    id?: string,
    date?: Date,
    transactionsDate: Date
    userId: string
}

export class TransactionsImport {

    public id: string
    public date: Date
    public transactionsDate: Date
    public userId: string

    private constructor(props: TransactionsImportProps) {
        this.id = props.id || crypto.randomUUID();
        this.date = props.date || new Date();
        this.transactionsDate = props.transactionsDate;
        this.userId = props.userId;
    };

    static create(props: TransactionsImportProps) {
        return new TransactionsImport(props);
    }
}