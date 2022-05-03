import { getInMemoryRepositories } from "../../../output/repositories/RepositoriesSource"
import RegisterTransactionsImportUseCase from "./RegisterTransactionsImportUseCase"

describe("Register TransactionsImports use case tests", () => {
  test("should create a transaction import", async () => {
    const repositories = getInMemoryRepositories()
    const spy = jest.spyOn(repositories.transactionsImports, "save")
    const sut = new RegisterTransactionsImportUseCase(
      repositories.transactionsImports
    )

    const importId = await sut.execute("1", new Date(2022, 0, 1))

    expect.assertions(2)
    expect(importId).toEqual(expect.any(String))
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
