import { InMemoryUserRepository } from "../../output/repositories/test/InMemoryUserRepository";
import Encryptor from "../../security/Encryptor";
import { LoginUserController } from "./LoginUserController";

describe('Controllers: VerifyCredentials', () => {

    const repository = new InMemoryUserRepository();
    const encryptor = new Encryptor("123");

    beforeAll(async () => {
        await repository.save({ id: "1", email: "test@email.com", name: "test", password: await encryptor.hashPassword("123456") })
    })

    test('should call redirect() to home page if login is valid', async () => {
        const request = {
            body: {
                email: "test@email.com",
                password: "123456"
            },
            session: {}
        }
        const response = {
            redirect: jest.fn(),
        }
        const next = jest.fn();
        const sut = new LoginUserController(repository, encryptor);

        //@ts-ignore
        await sut.handle(request, response, next);

        expect.assertions(2);
        //@ts-ignore
        expect(request.session.userId).toEqual("1");
        expect(response.redirect).toHaveBeenCalledWith("/home");
    })

    test('should call redirect() to login page if login is invalid', async () => {
        const request = {
            body: {
                email: "test@email.com",
                password: "123"
            },
            session: {}
        }
        const response = {
            redirect: jest.fn(),
        }
        const next = jest.fn();
        const sut = new LoginUserController(repository, encryptor);

        //@ts-ignore
        await sut.handle(request, response, next);

        expect.assertions(2);
        //@ts-ignore
        expect(request.session.userId).toBeFalsy();
        expect(response.redirect).toHaveBeenCalledWith("/login");
    })
})