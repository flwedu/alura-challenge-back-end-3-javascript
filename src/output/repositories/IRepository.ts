export default interface IRepository<T> {

    findOne: (query: any) => Promise<T>;
    save: (entity: T) => Promise<string>;
    findById: (id: string) => Promise<T>;
    find: (query?: any) => Promise<T[]>;
    update: (entity: T, id: string) => Promise<string>;
    delete: (id: string) => Promise<string>;
}