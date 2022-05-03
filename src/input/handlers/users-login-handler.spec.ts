import BusinessRuleError from "../../application/errors/BusinessRuleError"
import { ErrorMessage } from "../../application/errors/ErrorMessage"
import { getInMemoryRepositories } from "../../output/repositories/RepositoriesSource"
import Encryptor from "../../security/Encryptor"
import { usersLoginHandler } from "./users-login-handler"

describe("Handler: User Login", () => {
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

  test("should call redirect() to home page if login is valid", async () => {
    const request = {
      body: {
        email: "test@email.com",
        password: "123456",
      },
      session: {},
    }
    const response = {
      redirect: jest.fn(),
    }
    const loginViewFn = jest.fn()
    const sut = usersLoginHandler(repositories, encryptor)

    //@ts-ignore
    await sut(request, response, loginViewFn)

    expect.assertions(2)
    //@ts-ignore
    expect(request.session.userId).toEqual("1")
    expect(response.redirect).toHaveBeenCalledWith("/home")
  })

  test('should call render("login") if password is invalid', async () => {
    const request = {
      body: {
        email: "test@email.com",
        password: "123",
      },
      session: {},
    }
    const response = {
      redirect: jest.fn(),
      render: jest.fn(),
    }

    const sut = usersLoginHandler(repositories, encryptor)

    //@ts-ignore
    await sut(request, response)

    expect.assertions(2)
    //@ts-ignore
    expect(request.session.userId).toBeFalsy()
    expect(response.render).toHaveBeenCalledWith("login", {
      error: new BusinessRuleError(ErrorMessage.INVALID_CREDENTIALS()),
    })
  })

  test('should call render("login") if login is inactive', async () => {
    await repositories.users.save({
      id: "2",
      email: "testInactive@email.com",
      name: "test",
      password: await encryptor.hashPassword("123"),
      active: false,
    })

    const request = {
      body: {
        email: "testInactive@email.com",
        password: "123",
      },
      session: {},
    }
    const response = {
      redirect: jest.fn(),
      render: jest.fn(),
    }

    const sut = usersLoginHandler(repositories, encryptor)

    //@ts-ignore
    await sut(request, response)

    expect.assertions(2)
    //@ts-ignore
    expect(request.session.userId).toBeFalsy()
    expect(response.render).toHaveBeenCalledWith("login", {
      error: new BusinessRuleError(ErrorMessage.USER_INACTIVE()),
    })
  })
})
