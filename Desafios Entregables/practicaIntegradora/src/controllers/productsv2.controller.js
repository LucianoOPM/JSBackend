const { isValidObjectId } = require("mongoose");
const { productService } = require("../services");
const querySearch = require("../utils/querySearch");
const pagination = require("../utils/pageBuilder");
const fileUrl = require("../utils/fileUrl");

class ProductController {
    get = async (req, res) => {
        try {
            const queryKeys = Object.keys(req.query)

            if (queryKeys.length < 1) {
                const emptyQuery = querySearch(req.query, "products")
                const products = await productService.getProduct(emptyQuery)
                const pageBuild = pagination(req, products)
                return res.status(200).sendSuccess(pageBuild)
            }

            const SEARCH_KEYS = ["sort", "limit", "page", "category", "disponibility"]
            const successKeys = queryKeys.some(keys => SEARCH_KEYS.includes(keys))

            if (!successKeys) return res.status(400).sendServerError('Some keys missmatch with accepted search keys')

            const searchQuery = querySearch(req.query, "products")

            const products = await productService.getProduct(searchQuery)

            const pageBuild = pagination(req, products)
            res.status(200).sendSuccess(pageBuild)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    getById = async (req, res) => {
        try {
            const { pid } = req.params
            if (!isValidObjectId(pid)) return res.status(400).sendServerError('Invalid product ID')

            const product = await productService.getProductById(pid)
            res.status(200).sendSuccess(product)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    post = async (req, res) => {
        try {
            const { title, description, price, code, stock, category, status } = req.body
            const fileLocation = req.file ? fileUrl(req.file) : null

            if (!title || !price || !code || !stock || !category || !description) return res.status(400).sendServerError("There's empty values")

            const newProduct = {
                title,
                description,
                price: Number(price),
                code,
                stock: Number(stock),
                category,
                status: Boolean(status),
                thumbnail: fileLocation ? [fileLocation] : []
            }
            const addProduct = await productService.createProduct(newProduct)

            res.status(200).sendSuccess(addProduct)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    update = async (req, res) => {
        try {
            if (!isValidObjectId(req.params.pid)) return res.status(404).sendServerError("Param isn't an valid ID")
            if (Object.keys(req.body).length < 1) return res.status(400).sendServerError("There's empty values to update")

            const updateProduct = await productService.updateProduct(req.params, req.body)

            res.status(200).sendSuccess({
                updateProduct,
                message: 'Product update success'
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    delete = async (req, res) => {
        try {
            const { pid } = req.params
            if (!isValidObjectId(pid)) return res.status(400).sendServerError("Product ID isn't a correct value")
            const deleteProduct = await productService.deleteProduct(pid)
            res.status(200).sendSuccess({
                deleteProduct,
                message: 'Product deleted successfully'
            })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}


module.exports = ProductController