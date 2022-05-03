import { getInMemoryRepositories } from "../../output/repositories/RepositoriesSource"
import Encryptor from "../../security/Encryptor"
import { verifyCredentialsHandler } from "./verify-credentials-handler"

describe("Handler: Verify Credentials", () => {
  const repositories = getInMemoryRepositories()
  const encryptor = new Encryptor("123")

  beforeAll(async () => {
    await repositories.users.save({
      id: "1",
      email: "test@email.com",
      name: "test",
      password: await encryptor.hashPassword("123456"),
      active: true,
    })
  })

  test("should call next() if userId is valid", async () => {
    const request = {
      session: {
        userId: "1",
        destroy: jest.fn(),
      },
    }
    const response = {
      redirect: jest.fn(),
      render: jest.fn(),
    }
    const next = jest.fn()
    const sut = verifyCredentialsHandler(repositories)

    //@ts-ignore
    await sut(request, response, next)

    expect.assertions(3)
    expect(next).toHaveBeenCalled()
    expect(response.redirect).not.toHaveBeenCalled()
    expect(request.session.destroy).not.toHaveBeenCalled()
  })

  test("should call redirect() to /login if userId is invalid", async () => {
    const request = {
      session: {
        userId: "2",
        destroy: jest.fn(),
      },
    }
    const response = {
      redirect: jest.fn(),
      render: jest.fn(),
    }
    const next = jest.fn()
    const sut = verifyCredentialsHandler(repositories)

    //@ts-ignore
    await sut(request, response, next)

    expect.assertions(2)
    expect(next).not.toHaveBeenCalled()
    expect(response.redirect).toHaveBeenCalledWith("/login")
  })

  test("should call redirect() to /login if session is undefined", async () => {
    const request = {
      session: {
        destroy: jest.fn(),
      },
    }
    const response = {
      redirect: jest.fn(),
      render: jest.fn(),
    }
    const next = jest.fn()
    const sut = verifyCredentialsHandler(repositories)

    //@ts-ignore
    await sut(request, response, next)

    expect.assertions(2)
    expect(next).not.toHaveBeenCalled()
    expect(response.redirect).toHaveBeenCalledWith("/login")
  })
})
