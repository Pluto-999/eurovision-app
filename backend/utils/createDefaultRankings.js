const entries_2025 = require("../../db_init/data/json_data/entries_2025.json")
const entries_2024 = require("../../db_init/data/json_data/entries_2024.json")
const entries_2023 = require("../../db_init/data/json_data/entries_2023.json")
const entries_2022 = null
const entries_2021 = null
const entriesByYear = {
    2021: entries_2021, 
    2022: entries_2022, 
    2023: entries_2023, 
    2024: entries_2024, 
    2025: entries_2025
}
const sql = require("../config/db")

async function createDeafultRankings(username) {
    for (var year in entriesByYear) {
        entries_data = entriesByYear[year]
        position = -1
        if (entries_data) {
            for (const entry of entries_data["all_entries"]) {
                await sql`
                    INSERT INTO ranking(country, year, username, position)
                    VALUES (${entry["country"]}, ${entry["year"]}, ${username}, ${position})
                `
                position--
            }
        }
    }
}

module.exports = createDeafultRankings