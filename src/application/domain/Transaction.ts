import crypto from "crypto";

export type TransactionProps = {
    [index: string]: any,
    originBankName: string,
    originBankAgency: string,
    originBankNumber: string,
    destinyBankName: string,
    destinyBankAgency: string,
    destinyBankNumber: string,
    value: string;
    date: Date;
    allFieldsFull: boolean;
    userId: string;
    importId?: string;
}

export class Transaction {

    public id: string;

    private constructor(public props: TransactionProps, id?: string) {
        this.id = id || crypto.randomUUID();
    };

    static create(props: TransactionProps, id?: string) {
        return new Transaction(props, id);
    }
}