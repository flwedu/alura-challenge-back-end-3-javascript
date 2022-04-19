import IRepository from "../../output/repositories/IRepository";
import { User } from "../domain/User";
import { CreateUserUseCase } from "./CreateUserUseCase"

test('should create a user id', async () => {

    const returnedUser = await User.create({ name: "Test", email: "Test@email.com" })

    const fakeRepository = {
        find: (query: string) => Promise.resolve([]),
        save: (props: any) => Promise.resolve(returnedUser.id),
        findById: () => Promise.reject(),
        delete: () => Promise.reject(),
        update: () => Promise.reject()
    } as IRepository<User>;

    const sut = new CreateUserUseCase(fakeRepository);

    expect(await sut.execute({ name: "Test", email: "Test@email.com" }
    )).toEqual(returnedUser.id);
})

test('should throw error for a existent user email in database', async () => {

    const returnedUser = await User.create({ name: "Test", email: "Test@email.com" })

    const fakeRepository = {
        find: (query: string) => Promise.resolve([returnedUser]),
        save: (props: any) => Promise.resolve(returnedUser.id),
        findById: () => Promise.reject(),
        delete: () => Promise.reject(),
        update: () => Promise.reject()
    } as IRepository<User>;

    const sut = new CreateUserUseCase(fakeRepository);

    await expect(sut.execute({ name: "Test", email: "Test@email.com" }
    )).rejects.toThrowError()
})