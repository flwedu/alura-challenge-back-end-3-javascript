import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import { InMemoryUserRepository } from "./in-memory-user-repository";


test('should save a entity', async () => {

    const entity = { id: "1", name: '1', email: '1', password: "1", active: true };
    const repository = new InMemoryUserRepository();

    const id = await repository.save(entity);
    const list = await repository.findAll();

    expect.assertions(2);
    expect(id).toEqual(entity.id);
    expect(list).toHaveLength(1);
})

test('should return a list with right length', async () => {

    const entity = {
        id: "1", name: '1', email: '1', password: "1", active: true
    };
    const entity2 = {
        id: "1", name: '1', email: '2', password: "1", active: true
    };
    const repository = new InMemoryUserRepository();

    await repository.save(entity);
    await repository.save(entity2);
    const list = await repository.findAll();

    expect.assertions(1);
    expect(list).toHaveLength(2);
})

test('should find one element by email', async () => {
    const entity = {
        id: "1", name: '1', email: "test@email.com", password: "1", active: true
    };
    const repository = new InMemoryUserRepository();

    await repository.save(entity);
    const finded = await repository.findByEmail("test@email.com");

    expect.assertions(1);
    expect(finded).toEqual({ ...entity, password: expect.any(String) });
})

test('should throw error when trying to find one element by email', async () => {
    const entity = {
        id: "1", name: '1', email: "test@email.com", password: "1", active: true
    };
    const repository = new InMemoryUserRepository();

    await repository.save(entity);

    expect.assertions(1);
    await expect(repository.findByEmail("testerror@email.com")).rejects.toEqual(new ResourceNotFoundError());
})