import IUserRepository from "../../../output/repositories/IUserRepository";
import { IEncryptor } from "../../../security/IEncryptor";
import BusinessRuleError from "../../errors/BusinessRuleError";
import { ErrorMessage } from "../../errors/ErrorMessage";


export type LoginUserProps = {
    email: string,
    password: string
}

export class LoginUserUseCase {

    constructor(private readonly repository: IUserRepository, private readonly encryptor: IEncryptor) { };

    async execute(props: LoginUserProps) {

        try {
            const user = await this.repository.findByEmail(props.email);
            const correctPassword = await this.encryptor.checkPassword(props.password, user.password);

            if (!user.active) throw new BusinessRuleError(ErrorMessage.USER_INACTIVE());
            if (!correctPassword) throw new BusinessRuleError(ErrorMessage.INVALID_CREDENTIALS());
            return Promise.resolve(user.id);
        }
        catch (err) {
            return Promise.reject(err);
        }

    }
}