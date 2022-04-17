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
    allFieldsFull: boolean
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
            date: new Date(source[7]),
            allFieldsFull: true
        };

        const entries = Object.entries(props);
        const hasNullField = entries.some(el => {
            const [_, value] = el;
            return (value == null || value == undefined || value == "")
        })
        props.allFieldsFull = !hasNullField;

        return new Transaction(props);
    }
}