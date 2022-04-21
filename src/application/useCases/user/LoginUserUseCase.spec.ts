import { InMemoryUserRepository } from "../../../output/repositories/test/InMemoryUserRepository";
import Encryptor from "../../../security/Encryptor";
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
    test('should return true', async () => {

        const userInRepository = await new RegisterUserUseCase(repository, encryptor).execute(user);
        const inputData = {
            email: "test@email.com",
            password: userInRepository.password
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
})
