import crypto from "crypto";

export type TransactionProps = {

    originBankName: string,
    originBankAgency: string,
    originBankNumber: string,
    destinyBankName: string,
    destinyBankAgency: string,
    destinyBankNumber: string,
    value: number;
    date: Date;
}

export class Transaction {

    public id: string;

    private constructor(props: TransactionProps, id?: string) {
        this.id = id || crypto.randomUUID();
        Object.assign(this, props);
    };

    static create(props: TransactionProps, id?: string) {
        return new Transaction(props, id);
    }
}

// Valor da transação
// Data e hora da transação