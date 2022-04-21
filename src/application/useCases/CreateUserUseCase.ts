import IRepository from "../../output/repositories/IRepository";
import { User, UserProps } from "../domain/User";

export class CreateUserUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(props: UserProps) {

        const user = await User.create(props);

        return this.repository.save(user);
    }
}