const express = require('express');
const {handlePayment} = require('../controller/paymentController')
const router = express.Router();

router.post('/initiate-payment',handlePayment)
module.exports = router;