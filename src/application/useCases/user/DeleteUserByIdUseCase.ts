import IRepository from "../../../output/repositories/IRepository";
import { User } from "../../domain/User";

export class DeleteUserByIdUseCase {

    constructor(private readonly repository: IRepository<User>) { };

    async execute(props: { actualId: string, idToDelete: string }): Promise<string> {

        // Verify if the logged user exists
        const user = await this.repository.findById(props.actualId);

        // Check if the user is Admin
        if (user.name == "Admin") return Promise.reject("Can't delete the Admin");

        // Check if the logged user id == idToDelete
        if (props.actualId == props.idToDelete) return Promise.reject("Can't delete the logged user");

        const deletedId = await this.repository.delete(props.idToDelete);
        return Promise.resolve(deletedId);
    }
}