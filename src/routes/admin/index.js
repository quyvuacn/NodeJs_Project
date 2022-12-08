const express = require('express')
const LoginController = require('../../app/controllers/admin/LoginController')
const UserController = require('../../app/controllers/admin/UserController')
const CategoryController = require('../../app/controllers/admin/CategoryController')
const AuthAdmin = require('../../app/middlewares/adminMiddlewaer')
const BrandController = require('../../app/controllers/admin/BrandController')
const ProductController = require('../../app/controllers/admin/ProductController')
const OrderController = require('../../app/controllers/admin/OrderController')

const adminRouter = express.Router()



//Admin Login
adminRouter.get('/login',LoginController.index)
adminRouter.post('/login',LoginController.checkAdmin)
//Auth Admin

adminRouter.use(AuthAdmin.loggedIn,AuthAdmin.locals)


//Dashboard User
adminRouter.get('/user/create',UserController.create)
adminRouter.post('/user/create',UserController.store)

adminRouter.get('/user/:userId/edit',UserController.edit)
adminRouter.get('/user/:userId',UserController.show)

adminRouter.get('/user',UserController.index)
adminRouter.put('/user',UserController.update)

adminRouter.delete('/user',UserController.destroy)

//Dashboard Category
adminRouter.get('/category/:categoryId/edit',CategoryController.edit)
adminRouter.get('/category/create',CategoryController.create)
adminRouter.post('/category',CategoryController.store)
adminRouter.delete('/category',CategoryController.destroy)
adminRouter.put('/category',CategoryController.update)
adminRouter.get('/category',CategoryController.index)

//Dashboard Brand

adminRouter.get('/brand/:brandId/edit',BrandController.edit)
adminRouter.get('/brand/create',BrandController.create)
adminRouter.post('/brand',BrandController.store)
adminRouter.delete('/brand',BrandController.destroy)
adminRouter.put('/brand',BrandController.update)
adminRouter.get('/brand',BrandController.index)

//Dashboard product 
//Product Image
adminRouter.get('/product/:productId/image', ProductController.showImage)
adminRouter.delete('/product/:productId/image',ProductController.destroyImage)
adminRouter.post('/product/:productId/image',ProductController.storeImage)
//Product Detail
adminRouter.get('/product/:productId/detail/:detailId/edit',ProductController.editDetail)
adminRouter.get('/product/:productId/detail',ProductController.indexDetail)
adminRouter.put('/product/:productId/detail',ProductController.updateDetail)
adminRouter.delete('/product/:productId/detail',ProductController.destroyDetail)
adminRouter.get('/product/:productId/create',ProductController.createDetail)
adminRouter.post('/product/:productId/create',ProductController.storeDetail)


adminRouter.get('/product/create',ProductController.create)
adminRouter.post('/product/create',ProductController.store)
adminRouter.get('/product/:productId/edit',ProductController.edit)
adminRouter.get('/product/:productId', ProductController.show)
adminRouter.get('/product', ProductController.index)
adminRouter.delete('/product', ProductController.destroy)
adminRouter.put('/product', ProductController.update)

//Dashboard Order
adminRouter.get('/order/:orderId', OrderController.show)
adminRouter.get('/order', OrderController.index)



// Remain => /admin/user
// adminRouter.get('*',function(req, res){
//     res.redirect('/admin/user')
// })

module.exports = adminRouter