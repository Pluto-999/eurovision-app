const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")

const getEntry = asyncWrapper(async (req, res) => {
    const year = req.params.year
    const country = req.params.country
    const data = await sql`
        SELECT *
        FROM Entry
        WHERE year=${year} AND country=${country}
    `
    res.status(200).json({ data: data })
})

module.exports = {
    getEntry
}