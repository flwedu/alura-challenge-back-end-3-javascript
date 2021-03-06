import IRepository from "../../../output/repositories/IRepository";
import { IEncryptor } from "../../../security/IEncryptor";
import { User, UserProps } from "../../domain/User";

export class RegisterUserUseCase {

    constructor(private readonly repository: IRepository<User>, private readonly encryptor: IEncryptor) { };

    async execute(props: UserProps) {

        const user = await User.create(props);

        const userWithEncryptedPass = { ...user, password: await this.encryptor.hashPassword(user.password) }
        await this.repository.save(userWithEncryptedPass);

        return Promise.resolve(user);
    }
}