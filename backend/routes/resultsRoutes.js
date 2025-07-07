const express = require("express")
const {
    getFinalResults,
    getSemiResults,
    getSingleCountryYearResults,
    getCountryResultsAllYears
} = require("../controllers/resultsController")
const router = express.Router()

router.get("/final/:year", getFinalResults)
router.get("/semi/:semi_number/:year", getSemiResults)
router.get("/:country/:year", getSingleCountryYearResults)
router.get("/:country", getCountryResultsAllYears)

module.exports = router