const knex = require("../database/knex")

class NotesController {
	async create(req, res) {
		const { title, description, rating, tags, links } = req.body
		const { user_id } = req.params

		const [note_id] = await knex("notes").insert({
			title,
			description,
			rating,
			user_id,
		})

		const linksInsert = links.map((link) => {
			return {
				note_id,
				url: link,
			}
		})

		await knex("links").insert(linksInsert)

		const tagsInsert = tags.map((tag) => {
			return {
				title,
				note_id,
				user_id,
			}
		})

		await knex("tags").insert(tagsInsert)

		res.json()
	}
}

module.exports = NotesController
