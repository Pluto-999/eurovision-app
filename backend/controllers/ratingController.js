const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const entries_2025 = require("../../db_init/data/json_data/entries_2025.json")
const entries_2024 = null
const entries_2023 = null
const entries_2022 = null
const entries_2021 = null
const entriesByYear = {
    2021: entries_2021, 
    2022: entries_2022, 
    2023: entries_2023, 
    2024: entries_2024, 
    2025: entries_2025
}

const changeRating = asyncWrapper(async(req, res) => {
    const username = await sql`
        SELECT username
        FROM users
        WHERE username=${req.username}
    `
    
    if (username.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    const { country, year, rating } = req.body

    if (!country || !year || !rating) {
        return res.status(400).json({ success: false, message: "All fields are required to rank a country" })
    }

    const entries = entriesByYear[year]

    // ensure a valid year is given in the request
    if (!entries) {
        return res.status(400).json({ success: false, message: "Sorry, data is not provided for this year" })
    }

    // ensure a valid position is given in the request
    if (rating <= 0 || rating > 5) {
        return res.status(400).json({ success: false, message: "Ensure you pick a valid rating between 1 and 5 for this entry" })
    }

    // ensure a valid country is given in the request
    if (!entries["all_entries"].some(entry => entry.country === country)) {
        return res.status(400).json({
            success: false,
            message: "Ensure you pick a country that competed in this year"
        })
    }

    const newRating = await sql`
        UPDATE ranking
        SET stars_rating=${rating}
        WHERE country=${country} AND year=${year} AND username=${username[0]["username"]}
        RETURNING *
    `

    res.status(200).json({ success: true, rating: newRating })

})

const getCurrentUserRating = asyncWrapper(async (req, res) => {
    const username = await sql`
        SELECT username
        FROM users
        WHERE username=${req.username}
    `
    
    if (username.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    const { country, year } = req.params

    if (!country || !year) {
        return res.status(400).json({ success: false, message: "Please ensure you specify the country and year you want to get the ranking of" })
    }

    const rating = await sql`
        SELECT stars_rating
        FROM ranking
        WHERE country=${country} 
            AND year=${year}
            AND username=${username[0]["username"]} 
    `

    res.status(200).json({ success: true, rating: rating[0]["stars_rating"] })

})

const getOtherUserRating = asyncWrapper(async (req, res) => {

})

module.exports = {
    changeRating,
    getCurrentUserRating,
    getOtherUserRating
}