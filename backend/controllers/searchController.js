const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")
const createReturnData = require("../utils/highestPosition")

const searchForData = asyncWrapper(async (req, res) => {
    const searchValue = req.body.searchValue
    const searchType = req.body.searchType

    if (!searchValue) {
        return res.status(400).json({ success: false, message: "Ensure you provide a value to search for" })
    }

    if (!searchType) {
        return res.status(400).json({ success: false, message: "Ensure you select what you are searching for from the search options" })
    }

    const splitString = searchValue.split(" ")

    const stringArray = []
    const numberArray = []

    splitString.forEach(item => {
        if (isNaN(item)) {
            stringArray.push(item)
        }
        else if (item !== ""){
            numberArray.push(Number(item))
        }
    })


    if (searchType === "Year") {
        if (numberArray.length === 1 && stringArray.length === 0) {
            
            // only valid search numbers are: 21 - 25 or 2021 - 2025
            let year = numberArray[0]
            const numberLength = String(year).length

            const errorMessage = `When searching for a year, please ensure it either is between: ${process.env.SEARCH_LOWEST_YEAR_SHORT} - ${process.env.SEARCH_HIGHEST_YEAR_SHORT} or ${process.env.SEARCH_LOWEST_YEAR_LONG} - ${process.env.SEARCH_HIGHEST_YEAR_LONG}`

            if (
                numberLength === 2 && 
                (year > Number(process.env.SEARCH_HIGHEST_YEAR_SHORT) ||
                year < Number(process.env.SEARCH_LOWEST_YEAR_SHORT))
            ) 
            {
                return res.status(400).json({ success: false, message: errorMessage })
            }

            if (
                numberLength === 4 &&
                (year > Number(process.env.SEARCH_HIGHEST_YEAR_LONG) ||
                year < Number(process.env.SEARCH_LOWEST_YEAR_LONG))
            ) 
            {
                return res.status(400).json({ success: false, message: errorMessage })
            }

            if (numberLength !== 4 && numberLength !== 2) {
                return res.status(400).json({ success: false, message: errorMessage })
            }

            // convert year to 4 digits to search for in db
            if (numberLength === 2) {
                year += 2000
            }

            const data = await sql`
                SELECT *
                FROM entry
                WHERE year=${year}
            `

            const toReturn = await createReturnData(data)

            return res.status(200).json({ success: true, data: toReturn })
        
        } 
        else {
            return res.status(400).json({ success: false, message: "When searching for a year, please provide exactly one valid year only and nothing else in your search" })
        }
    }


    if (numberArray.length > 0) {
        return res.status(400).json({ success: false, message: "Please ensure you search with alphabetical characters only when you are not searching for a year" })
    }

    const searchString = stringArray.join(" ")
    
    if (searchType === "Country") {
        
        if (searchString.length === 0) {
            return res.status(400).json({success: false, message: "Please ensure you provide some alphabetical characters to search for a country" })
        }

        const data = await sql`
            SELECT *
            FROM entry
            WHERE country ILIKE ${searchString + '%'}
        `

        const toReturn = await createReturnData(data)

        return res.status(200).json({ success: true, data: toReturn })

    }

    if (searchType === "Artist") {

        const data = await sql`
            SELECT *
            FROM entry
            WHERE artist ILIKE ${'%' + searchString + '%'}
        `

        const toReturn = await createReturnData(data)

        return res.status(200).json({ success: true, data: toReturn })
    }

    if (searchType === "Song") {

        const data = await sql`
            SELECT *
            FROM entry
            WHERE song ILIKE ${'%' + searchString + '%'}
        `

        const toReturn = await createReturnData(data)

        return res.status(200).json({ success: true, data: toReturn })
    }

})

module.exports = {
    searchForData
}