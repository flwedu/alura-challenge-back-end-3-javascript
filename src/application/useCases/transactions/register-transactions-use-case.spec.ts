import { getInMemoryRepositories } from "../../../output/repositories/RepositoriesSource"
import { Transaction } from "../../domain/Transaction";
import { RegisterTransactionsUseCase } from "./register-transactions-use-case";

describe('Register Transacions use case tests', () => {

    async function setupRepositories() {

        const repositories = getInMemoryRepositories();
        const spy = jest.spyOn(repositories.transactions, "saveAll")
        const sut = new RegisterTransactionsUseCase(repositories.transactions, repositories.transactionsImports)

        const importId = await repositories.transactionsImports.save({ id: "1", date: new Date(), transactionsDate: new Date(2022, 0, 1), userId: "1" })

        return { repositories, spy, sut, importId }
    }

    function generateTransaction(args?: [string, any][]) {
        const transaction = Transaction.create({
            date: new Date(),
            userId: "1",
            allFieldsFull: true,
            value: 200,
            originBankName: "TestOrigin",
            originBankAgency: "001",
            originBankNumber: "001",
            destinyBankName: "TestDestiny",
            destinyBankAgency: "001",
            destinyBankNumber: "001",
        })
        args?.forEach(arg => {
            const [key, value] = arg
            if (key in transaction.props && typeof value == typeof transaction.props[key]) {
                transaction.props[key] = value;
            }
        }
        )
        return transaction
    }

    test('should register a transaction', async () => {

        const { repositories, spy, sut, importId } = await setupRepositories()

        const input = [generateTransaction([["date", new Date(2022, 0, 1)]])]

        await sut.execute(input, importId);

        expect.assertions(2)
        expect(spy).toHaveBeenCalledTimes(1);
        expect(await repositories.transactions.findAll()).toHaveLength(1);
    })

    test('should register only one transaction if the dates are differents', async () => {

        const { repositories, spy, sut, importId } = await setupRepositories()

        const input = [generateTransaction([["date", new Date(2022, 0, 1)]]), generateTransaction([["date", new Date(2022, 0, 2)]])]

        await sut.execute(input, importId);

        expect.assertions(2)
        expect(spy).toHaveBeenCalledTimes(1);
        expect(await repositories.transactions.findAll()).toHaveLength(1);
    })

    test('should not register if a allFieldsFull= false', async () => {

        const { repositories, spy, sut, importId } = await setupRepositories()

        const input = [generateTransaction([["date", new Date(2022, 0, 1)], ["allFieldsFull", false]]), generateTransaction([["date", new Date(2022, 0, 1)], ["allFieldsFull", false]])]

        await sut.execute(input, importId);

        expect.assertions(2)
        expect(spy).toHaveBeenCalledTimes(0);
        expect(await repositories.transactions.findAll()).toHaveLength(0);
    })
})