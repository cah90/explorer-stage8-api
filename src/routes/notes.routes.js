const { Router } = require("express")
const notesRoutes = Router()
const NotesController = require("../controllers/NotesController.js")
const notesController = new NotesController()

notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/:id", notesController.show) // eg: /notes/7 , /notes/23. vai ser pego com req.params.id
notesRoutes.get("/", notesController.showAll) // eg: /notes/7, /notes/23 . vai ser pego com req.params.user_id
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes
