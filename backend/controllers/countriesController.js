const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")

const getAllCountries = asyncWrapper(async (req, res) => {
    const data = await sql`
        SELECT *
        FROM Countries
    `
    res.status(200).json({ data: data })
})

module.exports = {
    getAllCountries,
}