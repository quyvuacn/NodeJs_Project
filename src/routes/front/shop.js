const express = require('express')
const shopRouter = express.Router()

const shopController =  require('../../app/controllers/front/ShopController')
const Auth = require('../../app/middlewares/authMiddleware')


shopRouter.get('/:category',shopController.category)

shopRouter.get('/product/:id',shopController.show)
shopRouter.post('/product/:id',Auth.loggedIn,shopController.postComment)

shopRouter.get('/',shopController.index)




module.exports = shopRouter