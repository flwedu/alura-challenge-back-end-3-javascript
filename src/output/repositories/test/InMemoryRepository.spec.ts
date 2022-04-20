import { InMemoryRepository } from "./InMemoryRepository";

test('should save a entity', async () => {

    const entity = { a: '1', b: '1' };
    const repository = new InMemoryRepository();

    repository.save(entity);
    const list = await repository.find();

    expect.assertions(1);
    expect(list).toHaveLength(1);
})

test('should return a list with right length', async () => {

    const entity = { a: '1', b: '1' };
    const repository = new InMemoryRepository();

    repository.save(entity);
    repository.save(entity);
    const list = await repository.find();

    expect.assertions(1);
    expect(list).toHaveLength(2);
})

test.each([{ a: "1" }, { b: "1" }])('should find one element with a query', async (query) => {
    const entity = { a: '1', b: '1' };
    const repository = new InMemoryRepository();

    repository.save(entity);
    const finded = await repository.findOne(query);

    expect.assertions(1);
    expect(finded).toEqual(entity);
})

test.each([{ a: "0" }, { a: "2" }, { b: "2" }])('should not find one element with a query', async (query) => {
    const entity = { a: '1', b: '1' };
    const repository = new InMemoryRepository();

    repository.save(entity);

    expect.assertions(1);
    await expect(repository.findOne(query)).rejects.toEqual("No element found");
})