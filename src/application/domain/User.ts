import crypto from "crypto";
import { checkPassword, hashPassword } from "../../util/password-encrypt";

export type UserModel = {
    name: string,
    email: string
}

export type UserProps = {

    name: string,
    email: string,
}

export class User {

    public id: string;
    public name: string;
    public email: string;
    public password: string;

    private constructor(props: UserProps, password: string, id?: string) {
        this.id = id || crypto.randomUUID();
        this.name = props.name;
        this.email = props.name;
        this.password = password;

    };

    static async create(props: UserProps, id?: string) {
        const password = Math.floor(100000 + Math.random() * 900000).toString().padStart(6);
        const hashed = await hashPassword(password);
        return new User(props, hashed, id);
    }

    async checkPassword(password: string) {
        return checkPassword(password, this.password);
    }
}