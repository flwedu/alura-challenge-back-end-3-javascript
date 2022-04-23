import { Transaction } from "../../application/domain/Transaction";
import { User } from "../../application/domain/User";
import IRepository from "./IRepository"
import { InMemoryTransactionRepository } from "./test/InMemoryTransactionRepository";
import { InMemoryUserRepository } from "./test/InMemoryUserRepository";

/**
 * A wrapper to the repositories used in the application
 */
export type RepositoriesSource = {
    userRepository: IRepository<User>;
    transactionsRepository: IRepository<Transaction>;
}

/**
 * This function is used to create in memory repositories to tests.  
 * @returns {RepositoriesSource} a wrapper to **repositories**
 */
const getInMemoryRepository = (): RepositoriesSource => {
    const repositories = {
        userRepository: new InMemoryUserRepository(),
        transactionsRepository: new InMemoryTransactionRepository()
    } as RepositoriesSource;

    return repositories;
}

export { getInMemoryRepository }