import multer from "multer"
import { Router } from "express"
import { fileInputHandler } from "../input/handlers"
import { homeViewHandler } from "../input/handlers/view/home-view-handler"
import { RepositoriesSource } from "../output/repositories/RepositoriesSource"

export default (router: Router, repositories: RepositoriesSource) => {
  const homeView = homeViewHandler(repositories)
  const fileInput = fileInputHandler(repositories)

  const upload = multer({ dest: "uploads/" })

  router.get("/", homeView)
  router.post("/", upload.single("files"), fileInput)
}
