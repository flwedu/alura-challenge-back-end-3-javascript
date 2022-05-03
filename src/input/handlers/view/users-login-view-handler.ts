import { Request, Response } from "express"

export const usersLoginViewHandler =
  () => (request: Request, response: Response, error?: Error) => {
    console.log("login view")
    return response.render("login", { error })
  }
