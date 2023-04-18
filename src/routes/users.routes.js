const { Router } = require("express")
const usersRoutes = Router()
const UsersController = require("../controllers/UsersController.js")
const userController = new UsersController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/:id", userController.update)

module.exports = usersRoutes
