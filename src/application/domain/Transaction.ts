import crypto from "crypto";

export type TransactionProps = {

    originBankName: string,
    originBankAgency: string,
    originBankNumber: string,
    destinyBankName: string,
    destinyBankAgency: string,
    destinyBankNumber: string,
    value: string;
    date: Date;
}

export class Transaction {

    public id: string;

    private constructor(public props: TransactionProps, id?: string) {
        this.id = id || crypto.randomUUID();
    };

    static create(props: TransactionProps, id?: string) {
        return new Transaction(props, id);
    }

    static createFromStringArray(source: string[]) {

        const props = {
            originBankName: source[0],
            originBankAgency: source[1],
            originBankNumber: source[2],
            destinyBankName: source[3],
            destinyBankAgency: source[4],
            destinyBankNumber: source[5],
            value: source[6],
            date: new Date(source[7])
        };

        const entries = Object.entries(props);
        const nullEntry = entries.filter(el => !el[1]);
        if (nullEntry.length) return null;

        return new Transaction(props);
    }
}

// Valor da transação
// Data e hora da transação