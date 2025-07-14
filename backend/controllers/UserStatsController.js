const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const calculateAverage = require("../utils/userStatsAverage")

const getAverageRating = asyncWrapper(async (req, res) => {
    const { country, year } = req.params
    
    const allRatings = await sql`
        SELECT stars_rating
        FROM ranking
        WHERE country=${country} 
            AND year=${year} 
            AND stars_rating > 0
    `

    if (allRatings.length === 0) {
        return res.status(400).json({ success: false, message: "No one has rated this entry yet" })
    }

    const average = calculateAverage(allRatings, "stars_rating")
    
    const data = {
        country: country,
        year: year,
        average: average
    }

    res.status(200).json({ success: true, data: data })
})


const getAveragePosition = asyncWrapper(async (req, res) => {
    const { country, year } = req.params

    const allRankings = await sql`
        SELECT position
        FROM ranking
        WHERE country=${country}
            AND year=${year}
            AND position > 0
    `

    if (allRankings.length === 0) {
        return res.status(400).json({ success: false, message: "No one has ranking this entry yet" })
    }

    const average = calculateAverage(allRankings, "position")

    const data = {
        country: country,
        year: year,
        average: average
    }
    
    res.status(200).json({ success: true, data: data })
})


const getAveragePoints = asyncWrapper(async (req, res) => {
    const { country, year } = req.params

    const allPoints = await sql`
        SELECT points
        FROM ranking
        WHERE country=${country}
            AND year=${year}
            AND points > 0
    `

    if (allPoints.length === 0) {
        return res.status(400).json({ success: false, message: "No one has given this entry any points yet" })
    }

    const average = calculateAverage(allPoints, "points")

    const data = {
        country: country,
        year: year,
        average: average
    }

    res.status(200).json({ success: true, data: data })
})


const getTotalPoints = asyncWrapper(async (req, res) => {
    const { country, year } = req.params

    const allPoints = await sql`
        SELECT points
        FROM ranking
        WHERE country=${country}
            AND year=${year}
            AND points > 0
    `

    if (allPoints.length === 0) {
        return res.status(400).json({ success: false, message: "No one has given this entry any points yet" })
    }

    const data = {
        country: country,
        year: year,
        total_points: allPoints
    }

    res.status(200).json({ success: true, data: data })
    
})


// All the points from the ranking table added up are the user results
const getUserResults = asyncWrapper(async (req, res) => {
    const { year } = req.params

    const data = await sql`
        SELECT country, year, points
        FROM ranking
        WHERE year=${year}
    `

    const pointsMap = new Map([])

    for (const item of data) {
        const points = item["points"]
        const country = item["country"]
        if (pointsMap.has(country)) {
            pointsMap.set(country, pointsMap.get(country) + points)
        }
        else {
            pointsMap.set(country, points)
        }
    }

    let toReturn = []

    for (const [country, points] of pointsMap) {
        toReturn.push({
            country: country,
            year: 2025,
            points: points
        })
    }

    res.json({ success: true, data: toReturn })
})

module.exports = {
    getAverageRating,
    getAveragePosition,
    getAveragePoints,
    getTotalPoints,
    getUserResults
}