import { Request, Response } from "express"

export const usersLogoutHandler = () => {
  return async (request: Request, response: Response) => {
    const session = request.session

    try {
      session.destroy(() => {})
      response.redirect("/login")
    } catch (err) {
      console.error(err)
    }
  }
}
