const express = require("express")
const { 
    getEntriesPerYear, 
    getEntriesPerCountry, 
    getSingleEntry 
} = require("../controllers/entriesController")
const router = express.Router()

router.get("/year/:year", getEntriesPerYear)
router.get("/country/:country", getEntriesPerCountry)
router.get("/:country/:year", getSingleEntry)

module.exports = router