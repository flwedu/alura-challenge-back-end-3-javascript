import crypto from "crypto";
import { checkPassword, hashPassword } from "../../util/password-encrypt";

export type UserModel = {
    name: string,
    email: string
}

export type UserProps = {

    name: string,
    email: string,
    password: string
}

export class User {

    public id: string;
    public name: string;
    public email: string;
    public password: string;

    private constructor(props: UserProps, id?: string) {
        this.id = id || crypto.randomUUID();
        this.name = props.name;
        this.email = props.name;
        this.password = props.password;

    };

    static async create(props: UserProps, id?: string) {
        props.password = await hashPassword(props.password);
        return new User(props, id);
    }

    async checkPassword(password: string) {
        return checkPassword(password, this.password);
    }
}