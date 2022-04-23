import { InMemoryUserRepository } from "../../output/repositories/test/InMemoryUserRepository"
import Encryptor from "../../security/Encryptor";
import { VerifyCredentialsController } from "./VerifyCredentialsController"

describe('Controllers: VerifyCredentials', () => {

    const repository = new InMemoryUserRepository();
    const encryptor = new Encryptor("123");

    beforeAll(async () => {
        await repository.save({ id: "1", email: "test@email.com", name: "test", password: await encryptor.hashPassword("123456") })
    })

    test('should call next() if userId is valid', async () => {
        const request = {
            session: {
                userId: "1",
                destroy: jest.fn()
            }
        }
        const response = {
            redirect: jest.fn(),
            render: jest.fn()
        }
        const next = jest.fn();
        const sut = new VerifyCredentialsController(repository, encryptor);

        //@ts-ignore
        await sut.handle(request, response, next);

        expect.assertions(3);
        expect(next).toHaveBeenCalled();
        expect(response.redirect).not.toHaveBeenCalled();
        expect(request.session.destroy).not.toHaveBeenCalled();
    })

    test('should call redirect() to /login if userId is invalid', async () => {
        const request = {
            session: {
                userId: "2",
                destroy: jest.fn()
            }
        }
        const response = {
            redirect: jest.fn(),
            render: jest.fn()
        }
        const next = jest.fn();
        const sut = new VerifyCredentialsController(repository, encryptor);

        //@ts-ignore
        await sut.handle(request, response, next);

        expect.assertions(3);
        expect(next).not.toHaveBeenCalled();
        expect(response.redirect).toHaveBeenCalledWith("/login");
        expect(request.session.destroy).toHaveBeenCalled();
    })

    test('should call redirect() to /login if session is undefined', async () => {
        const request = {
            session: {
                destroy: jest.fn()
            }
        }
        const response = {
            redirect: jest.fn(),
            render: jest.fn()
        }
        const next = jest.fn();
        const sut = new VerifyCredentialsController(repository, encryptor);

        //@ts-ignore
        await sut.handle(request, response, next);

        expect.assertions(3);
        expect(next).not.toHaveBeenCalled();
        expect(response.redirect).toHaveBeenCalledWith("/login");
        expect(request.session.destroy).toHaveBeenCalled();
    })
})