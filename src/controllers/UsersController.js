class UsersController {
	async index(req, res) {
		res.send("hello world")
	}

	async create(req, res) {
		const user = req.body
		const { name } = req.body
		console.log(name)
		res.send("receveid")
	}
}

module.exports = UsersController
