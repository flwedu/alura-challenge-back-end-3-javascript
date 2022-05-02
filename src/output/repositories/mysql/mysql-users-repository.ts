//@ts-nocheck
import mysql2 from "mysql2/promise"
import { User } from "../../../application/domain/User";
import IUserRepository from "../IUserRepository";
import { MysqlAdapter } from "./mysql-adapter";


export class MysqlUsersRepository implements IUserRepository {

    private adapter = new MysqlAdapter()

    constructor(private readonly pool: mysql2.Pool) { }

    async save(user: User): Promise<string> {
        const [rows, _] = await this.pool.query("INSERT INTO users SET ?", this.adapter.toUserQuery(user))
        const savedUser = await this.adapter.toUser(rows)
        return Promise.resolve(savedUser.id)
    }
    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async update(newData: User, id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}