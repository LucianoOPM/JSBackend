const isLogged = (req, res, next) => {
    console.log(req.cookies);
    console.log(req.user);
    if (req.cookies["logged"]) return res.redirect('/products')
    next()
}

module.exports = {
    isLogged
}