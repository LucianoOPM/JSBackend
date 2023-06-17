const { productService, cartService } = require("../services")
const pagination = require("../utils/pageBuilder")
const querySearch = require("../utils/querySearch")

class ViewsController {
    products = async (req, res) => {
        try {

            /*Si no hay una sesion pasar valores como "usuario o desconocido" */
            const queryBuild = querySearch(req.query, "products")
            const products = await productService.getProduct(queryBuild)

            const { docs, nextLink, prevLink } = pagination(req, products)

            const test = {
                title: "E-Commerce",
                docs,
                style: "home.css",
                nextLink,
                prevLink
                /*Agregar el script*/
            }

            res.status(200).render('home', test)
        } catch (error) {
            res.sendServerError(error.message)
        }
    }

    productsById = async (req, res) => {
        try {
            const { PID } = req.params
            const product = await productService.getProductById(PID)

            const productView = {
                title: "E-Commerce",
                product,
                style: "home.css"
                /*Script: "viewProducts.js*/
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
                style: "sessions.css"
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
                style: "sessions.css"
            }
            res.status(200).render('restore', restoreView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    realtimeproducts = async (req, res) => {
        try {
            const realTimeRender = {
                title: "RealTimeProducts",
                style: "products.css",
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