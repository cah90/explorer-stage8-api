const { Router } = require("express")
const usersRoutes = Router()
const UsersController = require("../controllers/UsersController.js")
const userController = new UsersController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/:id", userController.update)
usersRoutes.delete("/:id", userController.delete)

module.exports = usersRoutes
