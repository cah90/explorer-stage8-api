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
				name: tag,
				note_id,
				user_id,
			}
		})

		await knex("tags").insert(tagsInsert)

		res.json()
	}

	async show(req, res) {
		const { id } = req.params

		const note = await knex("notes").where({ id }).first()
		const tags = await knex("tags").where({ note_id: id }).orderBy("name")
		const links = await knex("links")
			.where({ note_id: id })
			.orderBy("created_at")

		return res.json({
			...note,
			tags,
			links,
		})
	}

	async delete(req, res) {
		const { id } = req.params

		await knex("notes").where({ id }).delete()

		return res.json()
	}

	async showAll(req, res) {
		const { title, user_id, tags } = request.query

		let notes

		if (tags) {
			const filterTags = tags.split(",").map((tag) => tag.trim())

			notes = await knex("tags")
				.select(["notes.id", "notes.title", "notes.user_id"])
				.where("notes.user_id", user_id)
				.whereLike("notes.title", `%${title}%`)
				.whereIn("name", filterTags)
				.innerJoin("notes", "notes_id", "tags.note_id")
				.orderBy("notes.title")
		} else {
			notes = await knex("notes")
				.where({ user_id })
				.whereLike("title", `%${title}%`)
				.orderBy("title")
		}

		return response.json(notes)
	}
}

module.exports = NotesController
