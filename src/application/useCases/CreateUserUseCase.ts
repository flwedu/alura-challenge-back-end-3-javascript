import IRepository from "../../output/repositories/IRepository";
import { User, UserProps } from "../domain/User";

export class CreateUserUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(props: UserProps) {
        // Verify if email already exists
        const userWithSameEmail = await this.repository.find({ email: props.email });
        if (userWithSameEmail.length) {
            throw new Error(`User with ${props.email} already exists`);
        }

        const user = await User.create(props);

        return this.repository.save(user);
    }
}