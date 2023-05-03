const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    const object = {
        title: "Agregar productos",
        script: "main.js",
        style: "products.css"
    }
    res.render('realtimeproducts', object)
})

module.exports = router