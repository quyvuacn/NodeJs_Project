const db = require("../models")

const Auth = {
    loggedIn: function(req,res,next) {
        if(req.session.loggedIn){
            res.locals.user = req.session.user
            next()
        }else{
            req.session.login = {
                error : 'Sign in to continue'
            }
            res.redirect('/login')
        }
    },
    isAuth : function(req, res, next) {
        if(req.session.loggedIn){
            res.locals.user = req.session.user
            res.redirect('/')
        }else{
            next()
        }
    },
    locals : async function(req, res, next){
        try{
            let categories = await db.Category.findAll()
            let brands = await db.Brand.findAll()
            res.locals = {
                user : req.session.loggedIn ? req.session.user : null,
                request : {
                    params : req.params,
                    query : req.query,
                    path : req.path.split('/')
                },
                categories : categories,
                brands : brands,
                cart : req.session.cart,
                total : totalCart(req.session.cart)
            }
            next()
        }catch(error){
            console.log(error)
            res.redirect('/404')
        }
        
       
    }
}

function totalCart(cart) {
    let total = 0
    cart?.forEach(product=>{
        total += product.qty*(product.discount || product.price)
    })
    return total
}



module.exports = Auth