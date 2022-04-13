import Account from "./Account"

export type TransactionProps = {

    originAccout: Account;
    destinyAccount: Account;
    value: number;
    date: Date;
}

export class Transaction {

    private constructor(private props: TransactionProps) {
    };

    static create(props: TransactionProps) {
        return new Transaction(props);
    }
}

// Valor da transação
// Data e hora da transação