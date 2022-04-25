import ResourceNotFoundError from "../../../application/errors/ResourceNotFoundError";
import { InMemoryUserRepository } from "./InMemoryUserRepository";


test('should save a entity', async () => {

    const entity = { id: "1", name: '1', email: '1', password: "1", active: true };
    const repository = new InMemoryUserRepository();

    const id = await repository.save(entity);
    const list = await repository.find();

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
    const list = await repository.find();

    expect.assertions(1);
    expect(list).toHaveLength(2);
})

test.each([{ name: "1" }, { email: "1" }])('should find one element with a query', async (query) => {
    const entity = {
        id: "1", name: '1', email: '1', password: "1", active: true
    };
    const repository = new InMemoryUserRepository();

    await repository.save(entity);
    const finded = await repository.findOne(query);

    expect.assertions(1);
    expect(finded).toEqual({ ...entity, password: expect.any(String) });
})

test.each([{ name: "0" }, { email: "2" }])('should not find one element with a query', async (query) => {
    const entity = {
        id: "1", name: '1', email: '1', password: "1", active: true
    };
    const repository = new InMemoryUserRepository();

    await repository.save(entity);

    expect.assertions(1);
    await expect(repository.findOne(query)).rejects.toEqual(new ResourceNotFoundError());
})