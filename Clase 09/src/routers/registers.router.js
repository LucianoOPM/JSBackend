const { Router } = require('express')
const router = Router()

router.get('/register', (req, res) => {
    res.render('register', {
        style: 'index.css'
    })
})

module.exports = router