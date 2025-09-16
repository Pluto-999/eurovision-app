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
        return res.status(200).json({ 
            success: false, 
            message: "No one has rated this entry yet",
            data: {
                country: country,
                year: year,
                average: -1
            }     
        })
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
        return res.status(200).json({ 
            success: false, 
            message: "No one has ranked this entry yet",
            data: {
                country: country,
                year: year,
                average: -1
            }
        })
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
        return res.status(200).json({ 
            success: false, 
            message: "No one has given this entry any points yet",
            data: {
                country: country,
                year: year,
                average: -1
            }
        })
    }

    const average = calculateAverage(allPoints, "points")

    const data = {
        country: country,
        year: year,
        average: average
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
            year: year,
            points: points
        })
    }

    // sort in decreasing order, then sort alphabetically by country if points are equal
    toReturn.sort((a, b) => (
        a.points > b.points ? -1 : b.points > a.points ? 1 : a.country.localeCompare(b.country)
    ))

    
    let position = 1

    toReturn.forEach(element => {
        element["position"] = position
        position += 1
    })

    res.json({ success: true, data: toReturn })
})

module.exports = {
    getAverageRating,
    getAveragePosition,
    getAveragePoints,
    getUserResults
}