import { InMemoryUserRepository } from "../../../output/repositories/test/InMemoryUserRepository";
import Encryptor from "../../../security/Encryptor";
import { User } from "../../domain/User";
import { LoginUserUseCase } from "./LoginUserUseCase";
import { RegisterUserUseCase } from "./RegisterUserUseCase";

describe('LoginUserUseCase tests', () => {

    const user = {
        name: "Test",
        email: "test@email.com",
    }
    const encryptor = new Encryptor("123");
    const repository = new InMemoryUserRepository();
    const sut = new LoginUserUseCase(repository, encryptor);

    beforeAll(async () => {
        await repository.save({ id: "1", email: "test@email.com", name: "test", password: await encryptor.hashPassword("123456"), active: true });
    })

    test('should return true', async () => {

        const inputData = {
            email: "test@email.com",
            password: "123456"
        }

        const logged = await sut.execute(inputData);

        expect.assertions(1);
        expect(logged).toBeTruthy();
    })

    test('should throw error for user not found', async () => {

        const inputData = {
            email: "test1@email.com",
            password: "123456"
        }

        expect.assertions(1);
        await expect(sut.execute(inputData)).rejects.toEqual("No element found");
    })

    test('should throw error invalid password', async () => {

        const inputData = {
            email: "test@email.com",
            password: "1234566"
        }

        expect.assertions(1);
        await expect(sut.execute(inputData)).rejects.toEqual(new Error("Invalid password"));
    })

    test('should throw error for inactive user', async () => {

        await repository.save({ id: "1", email: "testInactive@email.com", name: "test", password: await encryptor.hashPassword("123456"), active: false });

        const inputData = {
            email: "testInactive@email.com",
            password: "123456"
        }

        expect.assertions(1);
        await expect(sut.execute(inputData)).rejects.toEqual(new Error("No element found"));
    })
})
