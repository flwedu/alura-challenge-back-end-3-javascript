import { InMemoryRepository } from "../../../output/repositories/test/InMemoryRepository";
import { Transaction } from "../Transaction";
import { CreateTransactionUseCase, TransactionInput } from "./CreateTransactionUseCase";

describe("Create Account use case tests", () => {

    describe("Should create a account", () => {

        test("without passing id", async () => {

            const repository = new InMemoryRepository<Transaction>();
            const sut = new CreateTransactionUseCase(repository);
            const data = {
                props: {
                    date: new Date(),
                    value: 150.0,
                    destinyBankName: "N",
                    destinyBankAgency: "1",
                    destinyBankNumber: "1",
                    originBankName: "M",
                    originBankAgency: "2",
                    originBankNumber: "2",
                }
            } as TransactionInput

            const resultId = await sut.execute(data);

            expect(resultId).toEqual(expect.any(String));
        })

        test("passing id", async () => {

            const repository = new InMemoryRepository<Transaction>();
            const sut = new CreateTransactionUseCase(repository);
            const data = {
                id: "1",
                props: {
                    date: new Date(),
                    value: 150.0,
                    destinyBankName: "N",
                    destinyBankAgency: "1",
                    destinyBankNumber: "1",
                    originBankName: "M",
                    originBankAgency: "2",
                    originBankNumber: "2",
                }
            } as TransactionInput

            const resultId = await sut.execute(data);

            expect(resultId).toEqual("1");
        })
    })
})