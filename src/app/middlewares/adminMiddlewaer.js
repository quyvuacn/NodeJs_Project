AuthAdmin = {
    loggedIn: function(req,res,next) {
        if(req.session.adminLoggerIn && req.originalUrl != '/admin/login'){
            res.locals.admin = req.session.admin
            next()
        }else{
            req.session.adminError = 'Sign in to continue'
            res.redirect('/admin/login')
        }
    },
    locals : function(req, res, next){
        res.locals = {
            request : {
                params : req.params,
                query : req.query,
                path : req.path.split('/')
            }
        }
        next()
    }
}


module.exports = AuthAdmin