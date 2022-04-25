export const ErrorMessage = {

    RESOURCE_NOT_FOUND: (id?: string) => id ? `Resource with id ${id} not found` : `Resource not found`,
    USER_INACTIVE: (id?: string) => id ? `User with id ${id} is disabled` : `User is disabled`,
    CANT_DELETE: {
        ADMIN: () => `Unable to delete Admin`,
        LOGGED_USER: () => `Cannot delete the logged in user`
    },
    INVALID_CREDENTIALS: () => `Invalid credentials`,
    ALREADY_REGISTRED: (type: string) => `${type} has already been registered`
}