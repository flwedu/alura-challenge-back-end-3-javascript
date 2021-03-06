import { InMemoryUserRepository } from "../../../output/repositories/test/InMemoryUserRepository";
import Encryptor from "../../../security/Encryptor";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

describe('RegisterUserUseCase tests', () => {

    const encryptor = new Encryptor("123");

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should register a user', async () => {

        const input = { id: "1", name: "Test", email: "Test@email.com" };
        const repository = new InMemoryUserRepository();
        const spy = jest.spyOn(repository, "save");
        const sut = new RegisterUserUseCase(repository, encryptor);

        const savedUser = await sut.execute(input);

        expect.assertions(2);
        expect(spy).toBeCalledTimes(1);
        expect(await repository.findById(savedUser.id)).toEqual({ ...input, password: expect.any(String) });
    })

    describe('Should throw an error: ', () => {

        test('when registering a user with email already registred in database', async () => {

            const input = { id: "1", name: "Test", email: "Test@email.com" };
            const repository = new InMemoryUserRepository();
            const spy = jest.spyOn(repository, "save");
            const sut = new RegisterUserUseCase(repository, encryptor);

            await sut.execute(input);

            expect.assertions(2);
            await expect(sut.execute(input)).rejects.toEqual("Email already registred");
            expect(spy).toBeCalledTimes(2);
        })
    })

})
