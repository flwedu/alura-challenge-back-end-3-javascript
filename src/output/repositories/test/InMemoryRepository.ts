import IRepository from "../IRepository";

export class InMemoryRepository<T> implements IRepository<T>{

    public list: any[];

    constructor() {
        this.list = [];
    };

    save(entity: any) {
        const oldLength = this.list.length;
        this.list.push(entity);
        const newLength = this.list.length;
        if (newLength > oldLength) return Promise.resolve(entity.id);
        return Promise.reject("Error saving")
    };
    findById(id: string) {
        const result = this.list.find(el => el.id == id);
        if (!result) return Promise.reject("Id not found");
        return Promise.resolve(result);
    };
    find(query?: any) {
        return Promise.resolve(this.list);
    };
    update(entity: T, id: string) {
        const result = this.list.findIndex(el => el.id == id);
        if (result < 0) return Promise.reject("Id not found");
        this.list[result] = entity;
        return Promise.resolve(id);
    };
    delete(id: string) {
        const index = this.list.findIndex(el => el.id == id);
        if (index < 0) return Promise.reject("Id not found");
        this.list.splice(index, 1);
        return Promise.resolve(id + " deleted");
    };

}