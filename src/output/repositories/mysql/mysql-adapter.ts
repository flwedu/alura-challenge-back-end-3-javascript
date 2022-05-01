import { Transaction } from "../../../application/domain/Transaction"
import { TransactionsImport } from "../../../application/domain/TransactionsImport"
import { User } from "../../../application/domain/User"
import { extractDate } from "../../../input/utils/date-functions"

type MysqlUser = {
    id: string,
    email: string,
    password: string
    name: string
}

type MysqlTransaction = {
    id: string,
    originBankName: string,
    originBankAgency: string,
    originBankNumber: string,
    destinyBankName: string,
    destinyBankAgency: string,
    destinyBankNumber: string,
    value: number;
    transactionDate: string;
    allFieldsFull: boolean;
    userId: string;
    importId: string;
}

type MysqlTransactionsImport = {
    id: string,
    importDate: string,
    transactionsDate: string,
    userId: string
}

export class MysqlAdapter {

    async toUser(row: MysqlUser) {
        return await User.create(row)
    }
    toTransaction(row: MysqlTransaction) {
        return Transaction.create({ ...row, date: new Date(row.transactionDate) }, row.id)
    }
    toTransactionsImport(row: MysqlTransactionsImport) {
        return TransactionsImport.create({ ...row, date: new Date(row.importDate), transactionsDate: new Date(row.transactionsDate) })
    }

    /**
     * Returns a array to be used as Insert/Update query
     * @param user 
     * @returns [id, name, email, password]
     */
    toUserQuery(user: User) {
        return { ...user } as MysqlUser
    }

    /**
     * Returns a array to be used as Insert/Update query
     * @param transactionsImport
     * @returns [id, transactionsDate, importDate, userId]
     */
    toTransactionImportQuery(transactionsImport: TransactionsImport) {
        return { ...transactionsImport, transactionsDate: extractDate(transactionsImport.date), importDate: transactionsImport.date.toISOString() } as MysqlTransactionsImport
    }

    /**
     * Returns a array to be used as Insert/Update query
     * @param transaction
     * @returns [id, transactionDate, value, originBankName, originBankAgency, originBankName, destinyBankName, destinyBankAgency, destinyBankName, userId, importId]
     */
    toTransactionQuery(transaction: Transaction) {
        const { id, props } = transaction
        return { id, ...props, transactionDate: props.date.toISOString() } as MysqlTransaction
    }
}