import mysql2 from "mysql2/promise"
import "dotenv/config"
import ITransactionImportRepository from "./ITransactionImportRepository";
import ITransactionRepository from "./ITransactionRepository";
import IUserRepository from "./IUserRepository";
import { MysqlTransactionsRepository } from "./mysql/mysql-transactions-repository";
import { InMemoryTransactionImportRepository, InMemoryTransactionRepository, InMemoryUserRepository } from "./test";
import { MysqlTransactionsImportsRepository } from "./mysql/mysql-transactions-imports-repository";
import { MysqlUsersRepository } from "./mysql/mysql-users-repository";
import DatabaseError from "../../application/errors/DatabaseError";

/**
 * A wrapper to the repositories used in the application
 */
export type RepositoriesSource = {
    connection: any,
    users: IUserRepository;
    transactionsImports: ITransactionImportRepository;
    transactions: ITransactionRepository;
}

/**
 * This function is used to create in memory repositories to tests.  
 * @returns {RepositoriesSource} a wrapper to **repositories**
 */
const getInMemoryRepositories = (): RepositoriesSource => {
    const repositories = {
        connection: null,
        users: new InMemoryUserRepository(),
        transactionsImports: new InMemoryTransactionImportRepository(),
        transactions: new InMemoryTransactionRepository()
    } as RepositoriesSource;

    return repositories;
}

const getMySQLRepositories = () => {

    try {
        const connection = mysql2.createPool({
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            waitForConnections: true,
            charset: "utf8mb4",
        })

        return {
            connection,
            transactions: new MysqlTransactionsRepository(connection),
            transactionsImports: new MysqlTransactionsImportsRepository(connection),
            users: new MysqlUsersRepository(connection)
        } as RepositoriesSource;
    } catch (err: any) {
        throw new DatabaseError(err.message)
    }

}

const getMySQLTestRepositories = () => {

    try {
        const connection = mysql2.createPool({
            database: process.env.MYSQL_TEST_DATABASE,
            port: 3306,
            user: process.env.MYSQL_TEST_USER,
            password: process.env.MYSQL_TEST_PASSWORD,
            waitForConnections: true,
            charset: "utf8mb4",
        })

        return {
            connection,
            transactions: new MysqlTransactionsRepository(connection),
            transactionsImports: new MysqlTransactionsImportsRepository(connection),
            users: new MysqlUsersRepository(connection)
        } as RepositoriesSource;
    }
    catch (err: any) {
        throw new DatabaseError(err.message)
    }
}

export { getInMemoryRepositories, getMySQLRepositories, getMySQLTestRepositories };
