const { hasNextPage: next, hasPrevPage: prev } = require("./urlNextAndPrev");

const pagination = (req, { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage }) => {
    const prevUrl = prev(req.originalUrl, prevPage, page)
    const nextUrl = next(req.originalUrl, nextPage, page)

    return {
        docs,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: hasPrevPage ? prevUrl : null,
        nextLink: hasNextPage ? nextUrl : null
    }
}

module.exports = pagination
