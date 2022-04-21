import IRepository from "../../output/repositories/IRepository";
import { User, UserProps } from "../domain/User";

export class RegisterUserUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(props: UserProps) {

        const user = await User.create(props);

        await this.repository.save(user);

        return Promise.resolve(user);
    }
}