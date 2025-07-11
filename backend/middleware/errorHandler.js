const errorHandler = (err, req, res, next) => {
    console.log(err)
    msg = err.message ? err.message : "Something went wrong, please try again"
    return res.status(500).json({ success: false, message: msg })
}

module.exports = errorHandler