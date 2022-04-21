import { InMemoryRepository } from "../../output/repositories/test/InMemoryRepository";
import { User } from "../domain/User";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

describe('RegisterUserUseCase tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should register a user', async () => {

        const input = { id: "1", name: "Test", email: "Test@email.com" };
        const repository = new InMemoryRepository<User>();
        const spy = jest.spyOn(repository, "save");
        const sut = new RegisterUserUseCase(repository);

        const savedUser = await sut.execute(input);

        expect.assertions(2);
        expect(spy).toBeCalledTimes(1);
        expect(await repository.findById(savedUser.id)).toEqual({ ...input, password: expect.any(String) });
    })

    describe('Should throw an error: ', () => {

        test('when registering a user with email already registred in database', async () => {

            const input = { id: "1", name: "Test", email: "Test@email.com" };
            const repository = new InMemoryRepository<User>();
            const spy = jest.spyOn(repository, "save");
            const sut = new RegisterUserUseCase(repository);

            await sut.execute(input);

            expect.assertions(2);
            await expect(sut.execute(input)).rejects.toEqual("Email already registred");
            expect(spy).toBeCalledTimes(2);
        })
    })

})
