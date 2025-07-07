const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")


const getEntriesPerYear = asyncWrapper(async (req, res) => {
    const year = req.params.year
    const data = await sql`
        SELECT *
        FROM Entry
        WHERE year=${year}
    `
    res.status(200).json({ success: true, data: data })
})


const getEntriesPerCountry = asyncWrapper(async (req, res) => {
    const country = req.params.country
    const data = await sql`
        SELECT *
        FROM Entry
        WHERE country=${country}
    `
    res.status(200).json({ success:true, data: data })
})


const getSingleEntry = asyncWrapper(async (req, res) => {
    const { year, country } = req.params
    const data = await sql`
        SELECT *
        FROM Entry
        WHERE year=${year} AND country=${country}
    `
    res.status(200).json({ success:true, data: data })
})


module.exports = {
    getEntriesPerYear,
    getEntriesPerCountry,
    getSingleEntry
}