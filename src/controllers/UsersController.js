const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
//const sqliteConnection = require("../database/sqlite")

const knex = require("../database/knex")

class UsersController {
	async create(req, res) {
		const { name, email, password } = req.body

		//USANDO O KNEX
		const checkUserExist = await knex("users").where("email", email)

		if (checkUserExist.length > 0) {
			throw new AppError("Este e-mail já está em uso.")
		}

		const hashedPassword = await hash(password, 8)

		await knex("users").insert({
			name,
			email,
			password: hashedPassword,
		})

		//USANDO O SQLITE
		// const database = await sqliteConnection()
		// const checkUserExist = await database.get(
		// 	"SELECT * FROM users WHERE email = (?)",
		// 	[email]
		// )

		// await database.run(
		// 	`
		//   INSERT INTO users (name, email, password)
		//   VALUES (?,?,?)
		// `,
		// 	[name, email, hashedPassoword]
		// )

		return res.status(201).json()
	}

	async update(req, res) {
		const { name, email, password, old_password } = req.body
		const { id } = req.params

		const [user] = await knex("users").where("id", id)

		if (!user) {
			throw new AppError("Usuário não encontrado.")
		}

		const [updateEmail] = await knex("users").where("email", email)

		if (updateEmail && updateEmail.id !== user.id) {
			throw new AppError("Este email já está em uso.")
		}

		user.name = name ?? user.name
		user.email = email ?? user.email

		if (password && !old_password) {
			throw new AppError(
				"Você precisa informar a senha antiga para definir a nova senha."
			)
		}

		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password)

			if (!checkOldPassword) {
				throw new AppError("A senha antiga não confere.")
			}

			user.password = await hash(password, 8)
		}

		await knex("users").where("id", id).update({
			name: user.name,
			email: user.email,
			password: user.password,
		})

		//USANDO O SQLITE
		// const database = await sqliteConnection()
		// const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

		// const updateEmail = await database.get(
		// 	"SELECT * FROM users WHERE email = (?)",
		// 	[email]
		// )

		// await database.run(
		// 	`
		//   UPDATE users SET
		//   name = ?,
		//   email = ?,
		//   password = ?,
		//   updated_at = DATETIME('now')
		//   WHERE id = ?
		//   `,
		// 	[user.name, user.email, user.password, user.id]
		// )

		return res.status(200).json()
	}

	async delete(req, res) {
		const { id } = req.params

		await knex("notes").where({ user_id: id }).delete()
		await knex("users").where({ id }).delete()

		return res.json()
	}
}

module.exports = UsersController
