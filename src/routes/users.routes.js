const { Router } = require("express")
const usersRoutes = Router()
const UsersController = require("../controllers/UsersController.js")
const userController = new UsersController()

usersRoutes.get("/", userController.index)

usersRoutes.post("/", userController.create)

module.exports = usersRoutes
