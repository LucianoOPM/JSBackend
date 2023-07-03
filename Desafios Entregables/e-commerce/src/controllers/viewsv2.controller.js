const { productService, cartService } = require("../services")
const pagination = require("../utils/pageBuilder")
const querySearch = require("../utils/querySearch")

class ViewsController {
    products = async (req, res) => {
        try {
            const queryBuild = querySearch(req.query, "products")
            const { products, pagination: pages } = await productService.paginate(queryBuild)
            const { prevLink, nextLink } = pagination(req, pages)

            const user = req?.user ?? null

            const productsRender = {
                logged: user ? false : true,
                title: "E-Commerce",
                products,
                style: "products.css",
                nextLink,
                prevLink,
                script: "viewProducts.js",
                role: user?.role ?? 'Invitado',
                addProducts: user?.role == 'ADMIN' ? true : false,
                first_name: user?.first_name,
                last_name: user?.last_name,
                cartID: user?.cartID
            }

            res.status(200).render('products', productsRender)
        } catch (error) {
            res.sendServerError(error.message)
        }
    }

    productsById = async (req, res) => {
        try {
            const { PID } = req.params
            const product = await productService.getById(PID)

            const productView = {
                title: "E-Commerce",
                product,
                style: "product.css",
                script: "viewProducts.js"
            }

            res.status(200).render('productViews', productView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    login = async (req, res) => {
        try {
            /*Si ya está logueado redirigir a products o home*/
            const loginView = {
                title: "Iniciar sesion",
                style: "login.css",
                script: "login.js"
            }
            res.status(200).render('login', loginView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    register = async (req, res) => {
        try {
            const registerView = {
                title: "Register",
                style: "register.css",
                script: "register.js"
            }
            res.status(200).render("register", registerView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    restore = (req, res) => {
        try {
            const restoreView = {
                title: "Restore Password",
                style: "sessions.css",
                script: "restore.js"
            }
            res.status(200).render('restore', restoreView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    realtimeproducts = async (req, res) => {
        try {
            const realTimeRender = {
                title: "Agregar Nuevos Productos",
                style: "realTimeProducts.css",
                script: "main.js",
            }
            res.status(200).render('realtimeproducts', realTimeRender)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    chat = async (req, res) => {
        try {
            const rend = {
                title: "Contacto",
                script: "chat.js",
                style: "chat.css"
            }

            res.status(200).render('chat', rend)
        } catch (error) {
            return res.status(500).sendServerError(error.message)
        }
    }

    userCart = async (req, res) => {
        try {
            const { cid } = req.params
            const { docs } = await cartService.getCarts(cid)

            const cartRender = {
                emptyCart: docs[0].products.length < 1 ? true : false,
                renderCart: docs,
                style: "normalize.css",
                title: `Cart ${cid}`
            }

            res.status(200).render('cartView', cartRender)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}

module.exports = ViewsController