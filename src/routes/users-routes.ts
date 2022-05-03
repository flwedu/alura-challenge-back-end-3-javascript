import { usersRegisterHandler } from "@src/input/handlers"
import { usersListViewHandler } from "@src/input/handlers/view/users-list-view-handler"
import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource"
import { IEncryptor } from "@src/security/IEncryptor"
import { Router } from "express"

export default (
  router: Router,
  repositories: RepositoriesSource,
  encryptor: IEncryptor
) => {
  const usersListView = usersListViewHandler(repositories)
  const usersRegistry = usersRegisterHandler(repositories, encryptor)

  router.get("/users", usersListView)
  router.post("/users", usersRegistry)
}
