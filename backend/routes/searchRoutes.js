const express = require("express")
const { searchForData } = require("../controllers/searchController")
const router = express.Router()

router.post("/", searchForData)

module.exports = router
