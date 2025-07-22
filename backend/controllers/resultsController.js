const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")


const getFinalResults = asyncWrapper(async (req, res) => {
    const year = req.params.year
    const data = await sql`
        SELECT *
        FROM final_result
        WHERE year=${year}
        ORDER BY position
    `
    res.status(200).json({ success: true, data: data })
})


const getSemiResults = asyncWrapper(async (req, res) => {
    const { semi_number, year } = req.params
    const data = await sql`
        SELECT *
        FROM semi_result
        WHERE year=${year} AND semi_number = ${semi_number}
        ORDER BY position
    `
    res.status(200).json({ success: true, data: data })
})


const getSingleCountryYearResults = asyncWrapper(async (req, res) => {
    const { country, year } = req.params
    const semi_data = await sql`
        SELECT *
        FROM semi_result
        WHERE year=${year} AND country=${country}
    `
    const final_data = await sql`
        SELECT *
        FROM final_result
        WHERE year=${year} AND country=${country}
    `
    res.status(200).json({ success: true, data: { semi_result: semi_data, final_result: final_data } })
})


const getCountryResultsAllYears = asyncWrapper(async (req, res) => {
    const country = req.params.country
    const semi_data = await sql`
        SELECT *
        FROM semi_result
        WHERE country=${country}
        ORDER BY year DESC
    `
    const final_data = await sql`
        SELECT *
        FROM final_result
        WHERE country=${country}
        ORDER BY year DESC
    `
    res.status(200).json({ success: true, data: { semi_results: semi_data, final_results: final_data } })
})

module.exports = {
    getFinalResults,
    getSemiResults,
    getSingleCountryYearResults,
    getCountryResultsAllYears,
}