export type AccountProps = {
    bank: string,
    agencyNumber: string,
    accountNumber: string,
}

export default class Account {

    private constructor(private props: AccountProps) { };

    static create(props: AccountProps) {
        return new Account(props);
    }
}

// Banco origem
// Agência origem
// Conta origem
// Banco destino
// Agência destino
// Conta destino