const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const points_distribution = require("../data/points_distribution.json")
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

const updateUserDetails = asyncWrapper(async (req, res) => {
    res.send("update user details")
})

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await sql`
        SELECT username, email
        FROM users
    `
    if (users.length === 0) {
        return res.status(401).json({ success: false, message: "no users exist" })
    }

    res.status(200).json({ success: true, users: users })
})

const homePage = asyncWrapper(async (req, res) => {
    const user = await sql`
        SELECT username, email
        FROM users
        WHERE username=${req.username}
    `
    if (user.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    res.status(200).json({ success: true, user: user[0] })
})

const changeRanking = asyncWrapper(async (req, res) => {
    const username = await sql`
        SELECT username
        FROM users
        WHERE username=${req.username}
    `
    
    if (username.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    const { country, year, position } = req.body

    if (!country || !year || !position) {
        return res.status(400).json({ success: false, message: "All fields are required to rank a country" })
    }

    const entries = entriesByYear[year]

    // ensure a valid year is given in the request
    if (!entries) {
        return res.status(400).json({ success: false, message: "Sorry, data is not provided for this year" })
    }

    // ensure a valid position is given in the request
    if (position <= 0 || position > entries["all_entries"].length) {
        return res.status(400).json({ success: false, message: "Ensure you pick a valid position to rank this entry" })
    }

    // ensure a valid country is given in the request
    if (!entries["all_entries"].some(entry => entry.country === country)) {
        return res.status(400).json({
            success: false,
            message: "Ensure you pick a country that competed in this year"
        })
    }


    // now we can create the ranking as the request data is valid
    const points = position <= 10 ? points_distribution[position] : -1


    const ranking = await sql`
        UPDATE ranking
        SET position=${position}, points=${points}
        WHERE country=${country} AND year=${year} AND username=${username[0]["username"]}
        RETURNING *
    `

    res.status(200).json({ success: true, ranking: ranking })
})


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

module.exports = {
    updateUserDetails,
    getAllUsers,
    homePage,
    changeRanking,
    changeRating
}