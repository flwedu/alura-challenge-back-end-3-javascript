import { Router } from "express"
import { usersRegisterHandler } from "../input/handlers"
import { usersListViewHandler } from "../input/handlers/view/users-list-view-handler"
import { RepositoriesSource } from "../output/repositories/RepositoriesSource"
import { IEncryptor } from "../security/IEncryptor"

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
