import IRepository from "../../../output/repositories/IRepository";
import { IEncryptor } from "../../../security/IEncryptor";
import { User } from "../../domain/User";
import { ErrorMessage } from "../../errors/ErrorMessage";


export type LoginUserProps = {
    email: string,
    password: string
}

export class LoginUserUseCase {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async execute(props: LoginUserProps) {

        try {
            const user = await this.repository.findOne({ email: props.email });
            const correctPassword = await this.encryptor.checkPassword(props.password, user.password);

            if (!user.active) throw new Error(ErrorMessage.USER_INACTIVE());
            if (!correctPassword) throw new Error(ErrorMessage.INVALID_CREDENTIALS());
            return Promise.resolve(user.id);
        }
        catch (err) {
            return Promise.reject(err);
        }

    }
}