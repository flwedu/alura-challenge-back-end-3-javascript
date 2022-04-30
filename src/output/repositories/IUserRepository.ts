import { User } from "../../application/domain/User";

export default interface IUserRepository {

    save(user: User): Promise<string>
    findAll(): Promise<User[]>
    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
    update(newData: User, id: string): Promise<string>
    delete(id: string): Promise<string>
}