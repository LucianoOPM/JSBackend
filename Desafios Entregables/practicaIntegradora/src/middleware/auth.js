const isLogged = (req, res, next) => {
    if (req.cookies["logged"]) return res.redirect('/products')
    next()
}

module.exports = {
    isLogged
}