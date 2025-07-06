const express = require("express")
const { getEntry } = require("../controllers/entriesController")

const router = express.Router()

router.get("/:country/:year", getEntry)

module.exports = router