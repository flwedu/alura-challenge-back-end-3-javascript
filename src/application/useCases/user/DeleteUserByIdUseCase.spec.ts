import { InMemoryUserRepository } from "../../../output/repositories/test"
import { User } from "../../domain/User"
import BusinessRuleError from "../../errors/BusinessRuleError"
import { ErrorMessage } from "../../errors/ErrorMessage"
import ResourceNotFoundError from "../../errors/ResourceNotFoundError"
import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase"

describe("Delete User by Id use case:", () => {
  test("should return the id of a deleted a user", async () => {
    const user = await User.create({
      id: "1",
      name: "test",
      email: "test@email.com",
    })
    const user2 = await User.create({
      id: "2",
      name: "test",
      email: "test2@email.com",
    })
    const repository = new InMemoryUserRepository()
    const sut = new DeleteUserByIdUseCase(repository)
    await repository.save(user)
    await repository.save(user2)

    const deletedId = await sut.execute({ actualId: "1", idToDelete: "2" })

    expect(deletedId).toEqual("2")
  })

  describe("Should throw error: ", () => {
    test("When the logged user id is equal of the desired id to delete", async () => {
      const user = await User.create({ id: "1", name: "test", email: "test" })
      const repository = new InMemoryUserRepository()
      const sut = new DeleteUserByIdUseCase(repository)
      await repository.save(user)

      await expect(
        sut.execute({ actualId: "1", idToDelete: "1" })
      ).rejects.toEqual(
        new BusinessRuleError(ErrorMessage.CANT_DELETE.LOGGED_USER())
      )
    })

    test("When trying to delete a invalid id", async () => {
      const user = await User.create({ id: "1", name: "test", email: "test" })
      const repository = new InMemoryUserRepository()
      const sut = new DeleteUserByIdUseCase(repository)
      await repository.save(user)

      await expect(
        sut.execute({ actualId: "1", idToDelete: "2" })
      ).rejects.toEqual(new ResourceNotFoundError("2"))
    })
  })
})
