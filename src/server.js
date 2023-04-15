const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
	res.send("hello world")
})

app.post("/users", (req, res) => {
	const user = req.body
	const { name } = req.body
	console.log(name)
	res.send("receveid")
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running at port number ${PORT}`))
