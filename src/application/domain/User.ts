import crypto from "crypto";

export type UserModel = {
    name: string,
    email: string
}

export type UserProps = {

    id?: string,
    name: string,
    email: string,
}

export class User {

    public id: string;
    public name: string;
    public email: string;
    public password: string;

    private constructor(props: UserProps, password: string) {
        this.id = props.id || crypto.randomUUID();
        this.name = props.name;
        this.email = props.email;
        this.password = password;

    };

    static async create(props: UserProps) {
        const password = Math.floor(100000 + Math.random() * 900000).toString().padStart(6);
        return new User(props, password);
    }
}