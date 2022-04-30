import ITransactionImportRepository from "./ITransactionImportRepository";
import ITransactionRepository from "./ITransactionRepository";
import IUserRepository from "./IUserRepository";
import { InMemoryTransactionImportRepository, InMemoryTransactionRepository, InMemoryUserRepository } from "./test";

/**
 * A wrapper to the repositories used in the application
 */
export type RepositoriesSource = {
    users: IUserRepository;
    transactionsImports: ITransactionImportRepository;
    transactions: ITransactionRepository;
}

/**
 * This function is used to create in memory repositories to tests.  
 * @returns {RepositoriesSource} a wrapper to **repositories**
 */
const getInMemoryRepository = (): RepositoriesSource => {
    const repositories = {
        users: new InMemoryUserRepository(),
        transactionsImports: new InMemoryTransactionImportRepository(),
        transactions: new InMemoryTransactionRepository()
    } as RepositoriesSource;

    return repositories;
}

export { getInMemoryRepository };
