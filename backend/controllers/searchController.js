const sql = require("../config/db")
const asyncWrapper = require("../middleware/asyncWrapper")

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

    const searchString = stringArray.join(" ")
    
    if (searchType === "Country & Year") {
        
        if (searchString.length === 0) {
            return res.status(400).json({success: false, message: "Please ensure you provide some alphabetical characters to search for a country" })
        }

        if (numberArray.length === 0) {
            return res.status(400).json({ success: false, message: "Please ensure you provide a year to search for. This includes making sure that the year is not directly preceded or followed by an alphabetical character"})
        }
        if (numberArray.length > 1) {
            return res.status(400).json({ success: false, message: "Please search for a maximum of just one year at a time" })
        }

        // only valid numbers in search are: 25 - 21 or 2025 - 2021, so outside of this is an error
        else {
            let year = numberArray[0]
            const numberLength = String(year).length

            const errorMessage = `When giving a year, please ensure it either is between: ${process.env.SEARCH_LOWEST_YEAR_SHORT} - ${process.env.SEARCH_HIGHEST_YEAR_SHORT} or ${process.env.SEARCH_LOWEST_YEAR_LONG} - ${process.env.SEARCH_HIGHEST_YEAR_LONG}`

            console.log("YEAR!!!", numberLength)

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
                console.log(year)
                year += 2000
            }

            console.log(year)

            const data = await sql`
                SELECT *
                FROM entry
                WHERE country ILIKE ${searchString + '%'} AND year=${year}
            `

            console.log(data)

            return res.status(200).json({ success: true, data: data })
        }

    }

    if (searchType === "Artist") {
        if (numberArray.length > 0) {
            return res.status(400).json({success: false, message: 'Since you are searching with a number, please search under "Country & Year"'})
        }

        const data = await sql`
            SELECT *
            FROM entry
            WHERE artist ILIKE ${'%' + searchString + '%'}
        `

        console.log(data)

        return res.status(200).json({ success: true, data: data })
    }

    if (searchType === "Song") {
        if (numberArray.length > 0) {
            return res.status(400).json({success: false, message: 'Since you are searching with a number, please search under "Country & Year"'})
        }

        const data = await sql`
            SELECT *
            FROM entry
            WHERE song ILIKE ${'%' + searchString + '%'}
        `

        console.log(data)

        return res.status(200).json({ success: true, data: data })
    }

})

module.exports = {
    searchForData
}