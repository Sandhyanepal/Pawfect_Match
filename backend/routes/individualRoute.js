const express = require('express')
const { getIndividualUser } = require('../controller/individualController')

const router = express.Router()

// router.post("/get-individual-owner", getIndividualUser);
router.get('/get-individual-owner/:id', getIndividualUser)

module.exports = router
