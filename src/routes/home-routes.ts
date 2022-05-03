import multer from "multer"
import { fileInputHandler } from "@src/input/handlers"
import { homeViewHandler } from "@src/input/handlers/view/home-view-handler"
import { RepositoriesSource } from "@src/output/repositories/RepositoriesSource"
import { Router } from "express"

export default (router: Router, repositories: RepositoriesSource) => {
  const homeView = homeViewHandler(repositories)
  const fileInput = fileInputHandler(repositories)

  const upload = multer({ dest: "uploads/" })

  router.get("/", homeView)
  router.post("/", upload.single("files"), fileInput)
}
