import IRepository from "../../output/repositories/IRepository";
import { checkPassword } from "../../util/password-encrypt";
import { User } from "../domain/User";

export type LoginUserProps = {
    email: string,
    password: string
}

export class LoginUserUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(props: LoginUserProps) {

        try {
            const user = await this.repository.findOne({ email: props.email });
            const correctPassword = await checkPassword(props.password, user.password);

            if (!user) throw new Error("User not found")
            if (!correctPassword) throw new Error("Invalid password");
            return Promise.resolve(true);
        }
        catch (err) {
            return Promise.reject(err);
        }

    }
}