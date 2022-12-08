const express = require('express')
const cartController = require('../../app/controllers/front/CartController')
const cartRouter = express.Router()

const Auth = require('../../app/middlewares/authMiddleware')


cartRouter.put('/update',cartController.update)
cartRouter.delete('/delete',cartController.destroy)
cartRouter.get('/:product_id/add',cartController.addOne)
cartRouter.post('/create',cartController.store)

cartRouter.get('/',cartController.index)




module.exports = cartRouter