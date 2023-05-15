const auth = (req, res, next) => {
    if (req.session.user !== 'Luci' || !req.session.admin) {
        res.send('No puedes ver el contenido')
    }
    next()
}

module.exports = {
    auth
}