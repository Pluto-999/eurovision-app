const sql = require("../config/db")

async function highestPosition(country, year) {
    const final_position = await sql`
        SELECT *
        FROM final_result
        WHERE country=${country} AND year=${year}
    `
    
    if (final_position.length !== 0) {
        return [final_position[0].position, "final"]
    }
    else {
        const semi_position = await sql`
            SELECT *
            FROM semi_result
            WHERE country=${country} AND year=${year}
        `

        return [semi_position[0].position, "semi"]
    }
}

async function createReturnData(data) {
    toReturn = []
    for (const entry of data) {
        const [position, finalOrSemi] = await highestPosition(entry.country, entry.year)
        if (finalOrSemi === "semi") {
            entry.finalOrSemi = "Semi Final"
        }
        else {
            entry.finalOrSemi = "Final"
        }
        entry.position = position
        toReturn.push(entry)
    }

    return toReturn
}

module.exports = createReturnData