import { usersLogoutHandler } from "./users-logout-handler"

describe("Handler: Logout User: ", () => {
  test("should destroy the session and redirect to /login", async () => {
    //@ts-ignore
    const request = {
      session: {
        userId: "1",
        destroy: jest
          .fn()
          .mockImplementation(() => (request.session.userId = null)),
      },
    }
    const response = {
      redirect: jest.fn(),
    }
    const sut = usersLogoutHandler()

    //@ts-ignore
    await sut(request, response)

    expect.assertions(3)
    expect(request.session.destroy).toHaveBeenCalledTimes(1)
    expect(request.session.userId).toBeFalsy()
    expect(response.redirect).toHaveBeenCalledWith("/login")
  })
})
