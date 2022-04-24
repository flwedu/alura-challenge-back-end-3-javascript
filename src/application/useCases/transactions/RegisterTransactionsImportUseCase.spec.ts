import { InMemoryTransactionImportRepository } from "../../../output/repositories/test/InMemoryTransactionImportRepository";
import { Transaction } from "../../domain/Transaction";
import RegisterTransactionsImportUseCase from "./RegisterTransactionsImportUseCase";

describe('Use Case: Register Transactions Import:', () => {


    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should save a transaction', async () => {
        const transactions = [Transaction.create({ date: new Date("2022-01-01'T'01:00"), value: "100", originBankAgency: "1", originBankNumber: "1", originBankName: "Test", destinyBankAgency: "1", destinyBankNumber: "2", destinyBankName: "Test", userId: "1", allFieldsFull: true })]

        const repository = new InMemoryTransactionImportRepository();
        const spy = jest.spyOn(repository, "save");
        const sut = new RegisterTransactionsImportUseCase(repository);

        await sut.execute({ userId: "1", transactions });

        expect.assertions(2);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(repository.list).toHaveLength(1);
    })

    test('should save a import with only allfilled fields transaction with', async () => {
        const transactions = [Transaction.create({ date: new Date("2022-01-01T01:00"), value: "100", originBankAgency: "1", originBankNumber: "1", originBankName: "Test", destinyBankAgency: "1", destinyBankNumber: "2", destinyBankName: "Test", userId: "1", allFieldsFull: true }),
        Transaction.create({ date: new Date("2022-01-01T01:00"), value: "100", originBankAgency: "1", originBankNumber: "1", originBankName: "Test", destinyBankAgency: "1", destinyBankNumber: "2", destinyBankName: "Test", userId: "1", allFieldsFull: false })]

        const repository = new InMemoryTransactionImportRepository();
        const spy = jest.spyOn(repository, "save");
        const sut = new RegisterTransactionsImportUseCase(repository);

        const id = await sut.execute({ userId: "1", transactions });
        const saved = await repository.findById(id);

        expect.assertions(2);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(saved.transactions).toHaveLength(1);
    })

    test('should savea a import with only transaction with same date', async () => {
        const transactions = [Transaction.create({ date: new Date("2022-01-01T01:00"), value: "100", originBankAgency: "1", originBankNumber: "1", originBankName: "Test", destinyBankAgency: "1", destinyBankNumber: "2", destinyBankName: "Test", userId: "1", allFieldsFull: true }),
        Transaction.create({ date: new Date("2022-01-02T01:00"), value: "100", originBankAgency: "1", originBankNumber: "1", originBankName: "Test", destinyBankAgency: "1", destinyBankNumber: "2", destinyBankName: "Test", userId: "1", allFieldsFull: true }),
        Transaction.create({ date: new Date("2022-01-01T01:00"), value: "100", originBankAgency: "1", originBankNumber: "1", originBankName: "Test", destinyBankAgency: "1", destinyBankNumber: "2", destinyBankName: "Test", userId: "1", allFieldsFull: true })]

        const repository = new InMemoryTransactionImportRepository();
        const spy = jest.spyOn(repository, "save");
        const sut = new RegisterTransactionsImportUseCase(repository);

        const id = await sut.execute({ userId: "1", transactions });
        const saved = await repository.findById(id);

        expect.assertions(2);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(saved.transactions).toHaveLength(2);
    })
})