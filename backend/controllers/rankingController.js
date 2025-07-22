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

    // ensure a valid country is given in the request
    if (!entries["all_entries"].some(entry => entry.country === country)) {
        return res.status(400).json({
            success: false,
            message: "Ensure you pick a country that competed in this year"
        })
    }

    // ensure a valid position is given in the request
    
    const ranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} 
            AND username=${username[0]["username"]} 
            AND position >= 1 
    `

    const currentRank = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year}
            AND username=${username[0]["username"]}
            AND country=${country}
            AND position >= 1
    `

    // cannot have the same position 
    if (currentRank.length > 0 && currentRank[0]["position"] === position) {
        return res.status(400).json({ success: false, message: "Ensure you give a new ranking to this country" })
    }
    // e.g. if we have 1, 2, 3 and are trying to change 2 to 4, this is invalid as it will create a gap 
    if (currentRank.length > 0 && position > ranked_entries.length) {
        return res.status(400).json({ success: false, message: "Ensure positions stay sequential and don't create a gap when changing the ranking of this country" })
    }

    if (position <= 0 || position > ranked_entries.length + 1) {
        return res.status(400).json({ 
            success: false, 
            message: "Ensure you pick a valid position to rank this entry. This includes ranking entries sequentially" })
    }

    // if position is equal to the length of the list + 1, the user wants to insert it at the end...
    if (position === ranked_entries.length + 1 && ranked_entries.length < entries["all_entries"].length) {
        // now we can create the ranking as the request data is valid
        const points = position <= 10 ? points_distribution[position] : -1


        const ranking = await sql`
            UPDATE ranking
            SET position=${position}, points=${points}
            WHERE country=${country} AND year=${year} AND username=${username[0]["username"]}
            RETURNING *
        `

        return res.status(200).json({ success: true, ranking: ranking })
    }
    // in this case the country currently isn't ranked, so only need to shift other countries downwards including the one currently at position
    else if (currentRank.length === 0) {
        const shiftPositionDownwards = await sql`
            SELECT *
            FROM ranking
            WHERE year=${year}
                AND username=${username[0]["username"]}
                AND position>=${position} 
            ORDER BY position DESC
        `

        for (const entry of shiftPositionDownwards) {
                const newPosition = entry["position"] + 1
                const newPoints = newPosition <= 10 ? points_distribution[newPosition] : -1 
            
                await sql`
                    UPDATE ranking
                    SET position=${newPosition}, points=${newPoints}
                    WHERE country=${entry["country"]} AND year=${entry["year"]} AND username=${username[0]["username"]} 
                `
            }

        const updatedPoints = position <= 10 ? points_distribution[position] : -1
            const newRanking = await sql`
                UPDATE ranking
                SET position=${position}, points=${updatedPoints}
                WHERE country=${country} AND year=${year} AND username=${username[0]["username"]}
                RETURNING *  
            `

            return res.status(200).json({ success: true, newRanking: newRanking })
        
    }
    else {
        
        const countryInNewRank = await sql`
            SELECT *
            FROM ranking
            WHERE year=${year}
                AND username=${username[0]["username"]}
                AND position=${position}
        `

        const shiftPositionDownwards = await sql`
            SELECT *
            FROM ranking
            WHERE year=${year}
                AND username=${username[0]["username"]}
                AND position<${currentRank[0]["position"]}
                AND position>${position}
                AND country!=${country}
            ORDER BY position DESC
        `

        const shiftPositionUpwards = await sql`
            SELECT *
            FROM ranking
            WHERE year=${year}
                AND username=${username[0]["username"]}
                AND position>${currentRank[0]["position"]}
                AND position<${position}
                AND country!=${country}
            ORDER BY position ASC
        `


        console.log(currentRank)
        console.log("--------------------")
        console.log(countryInNewRank)
        console.log("--------------------")
        console.log(shiftPositionDownwards)
        console.log("--------------------")
        console.log(shiftPositionUpwards)



        // need to check if the country in the inputted position is less than or greater than the current rank of the country
        
        // if the current rank of the country is lower than the inputted position, we want to move the country down some positions
        // e.g. current position might be 1 and inputted position is 3, meaning we want to move the country down 2 positions
        // this then also means we need to use shiftPositionUpwards, as countries between currentRank and countryInNewRank need to be shifted upwards
        // also the country in the new rank will also need to be shifted upwards
        if (currentRank[0]["position"] < position) {

            // first set the position of the country we want to change (currentRank) to a dummy value
            await sql`
                UPDATE ranking
                SET position=-1000
                WHERE country=${country} AND year=${year} AND username=${username[0]["username"]} 
            `

            // next use shiftPosittionUpwards to shift all the country's positions up that are between the current rank and new rank
            for (const entry of shiftPositionUpwards) {
                const newPosition = entry["position"] - 1
                const newPoints = newPosition <= 10 ? points_distribution[newPosition] : -1 
            
                await sql`
                    UPDATE ranking
                    SET position=${newPosition}, points=${newPoints}
                    WHERE country=${entry["country"]} AND year=${entry["year"]} AND username=${username[0]["username"]} 
                `
            }

            // also need to update the country in new rank to be - 1 position
            const newPosition = countryInNewRank[0]["position"] - 1
            const newPoints = newPosition <= 10 ? points_distribution[newPosition] : -1 

            await sql`
                UPDATE ranking
                SET position=${newPosition}, points=${newPoints}
                WHERE country=${countryInNewRank[0]["country"]} AND year=${countryInNewRank[0]["year"]} AND username=${username[0]["username"]} 

            `

            // finally update the actual country being updated to its new position
            const updatedPoints = position <= 10 ? points_distribution[position] : -1
            const newRanking = await sql`
                UPDATE ranking
                SET position=${position}, points=${updatedPoints}
                WHERE country=${country} AND year=${year} AND username=${username[0]["username"]}
                RETURNING *  
            `

            return res.status(200).json({ success: true, newRanking: newRanking })
        }

        // if the current rank of the country is higher than the inputted position, we want to move the country up some positions
        // e.g. the current position might be 4 and inputted position is 2, meaning we want to move the country up 2 positions
        // this then also means we need to use shiftPositionDownwards, as countries between currentRank and countryInNewRank need to be shifted downwards
        // also the country in the new rank will also need to be shifted downwards
        
        else if (currentRank[0]["position"] > position) {
            
            // first set the position of the country we want to change (currentRank) to a dummy value
            await sql`
                UPDATE ranking
                SET position=-1000
                WHERE country=${country} AND year=${year} AND username=${username[0]["username"]} 
            `

            // next use shiftPosittionDownwards to shift all the country's positions down that are between the current rank and new rank
            for (const entry of shiftPositionDownwards) {
                const newPosition = entry["position"] + 1
                const newPoints = newPosition <= 10 ? points_distribution[newPosition] : -1 
            
                await sql`
                    UPDATE ranking
                    SET position=${newPosition}, points=${newPoints}
                    WHERE country=${entry["country"]} AND year=${entry["year"]} AND username=${username[0]["username"]} 
                `
            }

            // also need to update the country in new rank to be + 1 position
            const newPosition = countryInNewRank[0]["position"] + 1
            const newPoints = newPosition <= 10 ? points_distribution[newPosition] : -1 

            await sql`
                UPDATE ranking
                SET position=${newPosition}, points=${newPoints}
                WHERE country=${countryInNewRank[0]["country"]} AND year=${countryInNewRank[0]["year"]} AND username=${username[0]["username"]} 

            `

            // finally update the actual country being updated to its new position
            const updatedPoints = position <= 10 ? points_distribution[position] : -1
            const newRanking = await sql`
                UPDATE ranking
                SET position=${position}, points=${updatedPoints}
                WHERE country=${country} AND year=${year} AND username=${username[0]["username"]}
                RETURNING *  
            `

            return res.status(200).json({ success: true, newRanking: newRanking })
        }
    }
})

async function getRankings (year, username, res) {
    const entries = entriesByYear[year]

    // ensure a valid year is given in the request
    if (!entries) {
        return res.status(400).json({ success: false, message: "Sorry, data is not provided for this year" })
    }

    const ranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} AND username=${username[0]["username"]} AND position > 0
        ORDER BY position 
    `

    const unranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} AND username=${username[0]["username"]} AND position < 0
        ORDER BY position DESC

    `

    return res.status(200).json({ 
        success: true, 
        ranked_entries: ranked_entries, 
        unranked_entries: unranked_entries
    })
}


const getCurrentUserAllRankings = asyncWrapper(async (req, res) => {
    const username = await sql`
        SELECT username
        FROM users
        WHERE username=${req.username}
    `
    
    if (username.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    const year = req.params.year

    const entries = entriesByYear[year]

    // ensure a valid year is given in the request
    if (!entries) {
        return res.status(400).json({ success: false, message: "Sorry, data is not provided for this year" })
    }

    const ranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} AND username=${username[0]["username"]} AND position > 0
        ORDER BY position 
    `

    const unranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} AND username=${username[0]["username"]} AND position < 0
        ORDER BY position DESC

    `

    return res.status(200).json({ 
        success: true, 
        ranked_entries: ranked_entries, 
        unranked_entries: unranked_entries
    })

    return getRankings(req.params.year, username[0]["username"], res)
})

const getOtherUserAllRankings = asyncWrapper(async (req, res) => {
    const username = await sql`
        SELECT username
        FROM users
        WHERE username=${req.params.username}
    `
    
    if (username.length === 0) {
        return res.status(401).json({ success: false, message: "No user exists with this username" })
    }

    // return getRankings(req.params.year, username[0]["username"], res)

    const { year } = req.params

    const entries = entriesByYear[year]

    // ensure a valid year is given in the request
    if (!entries) {
        return res.status(400).json({ success: false, message: "Sorry, data is not provided for this year" })
    }

    const ranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} AND username=${username[0]["username"]} AND position > 0
        ORDER BY position 
    `

    const unranked_entries = await sql`
        SELECT *
        FROM ranking
        WHERE year=${year} AND username=${username[0]["username"]} AND position < 0
        ORDER BY position DESC

    `

    res.status(200).json({ 
        success: true, 
        ranked_entries: ranked_entries, 
        unranked_entries: unranked_entries
    })
})

const getCurrentUserSingleRanking = asyncWrapper(async (req, res) => {

})

const getOtherUserSingleRanking = asyncWrapper(async (req, res) => {

})

module.exports = {
    changeRanking,
    getCurrentUserAllRankings,
    getOtherUserAllRankings,
    getCurrentUserSingleRanking,
    getOtherUserSingleRanking
}