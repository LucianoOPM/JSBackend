const { Router } = require('express')
const router = Router()

router.post("/", (req, res) => {
    console.log(req.body)
    const { nombre } = req.body
    res.send(`<h1>Tu mascotita se llama ${nombre}</h1>`)
})

module.exports = router