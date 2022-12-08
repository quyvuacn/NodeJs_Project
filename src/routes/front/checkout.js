const express = require('express')
const CheckoutController = require('../../app/controllers/front/CheckoutController')
const Auth = require('../../app/middlewares/authMiddleware')
const checkoutRouter = express.Router()


checkoutRouter.get('/',CheckoutController.index)
checkoutRouter.post('/',Auth.loggedIn,CheckoutController.newOrder)

checkoutRouter.get('/result/done',CheckoutController.resultDone)
checkoutRouter.get('/vnPayCheck',CheckoutController.vnPayCheck)

module.exports = checkoutRouter