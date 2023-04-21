const { Router } = require("express")
const notesRoutes = Router()
const NotesController = require("../controllers/NotesController.js")
const notesController = new NotesController()

notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.get("/:user_id", notesController.showAll)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes
