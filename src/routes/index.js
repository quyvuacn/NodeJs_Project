const BlogController = require('../app/controllers/front/BlogController')
const HistoryController = require('../app/controllers/front/HistoryController')
const UserController = require('../app/controllers/front/UserController')

const Auth = require('../app/middlewares/authMiddleware')
const adminRouter = require('./admin')
const cartRouter = require('./front/cart')
const checkoutRouter = require('./front/checkout')
const homeRouter = require('./front/home')
const shopRouter = require('./front/shop')


function route(app){
    app.use('/shop',shopRouter)
    app.use('/cart',cartRouter)
    app.use('/checkout',checkoutRouter)
    app.get('/login',Auth.isAuth,UserController.login)
    app.post('/login',Auth.isAuth,UserController.checkLogin)
    app.get('/register',UserController.register)
    app.post('/register',UserController.newUser)
    app.get('/logout',UserController.logout)
    app.get('/contact',function(req,res){
        res.render('front/contact',{title : 'Contact'})
    })
    app.get('/blog/:blogName',BlogController.show)
    app.get('/blog',BlogController.index)
    app.get('/history',Auth.loggedIn,HistoryController.index)
    app.use('/',homeRouter)

    //Admin
    app.use('/admin',adminRouter)
    



}

module.exports = route