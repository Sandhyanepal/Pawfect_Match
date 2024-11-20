const express = require('express');
const { addCategory } = require('../controller/categoryController');
const router = express.Router()

router.post('/addcategory', addCategory)

module.exports = router;
