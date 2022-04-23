import { LogoutUserController } from ".";

describe('Controllers: Logout User Controller: ', () => {

    test('should destroy the session and redirect to /login', async () => {
        //@ts-ignore
        const request = {
            session: {
                userId: "1",
                destroy: jest.fn().mockImplementation(() => request.session.userId = null)
            },
        }
        const response = {
            redirect: jest.fn()
        }
        const sut = new LogoutUserController();

        //@ts-ignore
        await sut.handle(request, response);

        expect.assertions(3);
        expect(request.session.destroy).toHaveBeenCalledTimes(1);
        expect(request.session.userId).toBeFalsy();
        expect(response.redirect).toHaveBeenCalledWith("/login")
    })
})