const express = require("express")
const { getAllCountries } = require("../controllers/countriesController")

const router = express.Router()

// here we list all the countries
router.get("/", getAllCountries)

module.exports = router