const Account = require("../../utilities/Account")
const db = require("../../models")
const Constant = require("../../utilities/Constant")


class UserController{
    login(req, res){
        let data = {
            error : req.session.login ? req.session.login.error : null,
            notification : req.session.login ? req.session.login.notification : null,
            title : 'Login'
        } 
        delete req.session.login
        res.render('front/user/login',data)
    }
    register(req, res){
        let data = {
            title : 'Register',
            error : req.session.register ? req.session.register.error : null,
            notification : req.session.register ? req.session.register.notification : null,
            email : req.session.register ? req.session.register.email : null,
            name : req.session.register ? req.session.register.name : null
        }
        delete req.session.register

        res.render('front/user/register',data)
    }

    async newUser(req,res){
        try{
            let data = req.body
            data.password = data.password.trim()
            data.email = data.email.trim()

            data.level = Constant.USER_LEVEL['client']
            let is_create  = await db.User.findAll({where: {email : data.email}}).length == 0
            
            if(is_create){
                req.session.register = {
                    email : data.email,
                    name : data.name,
                    error : 'Email already used to register!'
                }
                res.redirect('/register')
            }
            if(data.password === data.r_password){
                data.password = Account.hashPassword(data.password)
                await db.User.create(data)
                req.session.login = {
                    notification : 'Registration completed. You can login now!'
                } 
                res.redirect('/login')
            }else{
                req.session.register = {
                    email : data.email,
                    name : data.name,
                    error : 'Confirm password does not match'
                }
                res.redirect('/register')
            }
            
        }catch(err){
            console.log(err)
            res.send('error')
        }


    }

    async checkLogin(req,res){
        try{
            let UserOrFail = await db.User.findOne({
                where : {
                    email : req.body.email.trim()
                }
            })
            if(UserOrFail){
                if(UserOrFail.level == Constant.USER_LEVEL['not_verifie']){
                    req.session.login = {
                        error : 'Account not verified!'
                    } 
                    res.redirect('/login')
                }
                let password = req.body.password
                let hashPassword = UserOrFail.password
                let correct_password = Account.comparePassword(password,hashPassword)
                if(correct_password){
                    req.session.loggedIn = true
                    req.session.user = UserOrFail
                    if(req.body.save_pass){
                        req.session.save_pass = true
                    }
                    res.redirect('/')
                }
            }else{
                req.session.login = {
                    error : 'Incorrect account or password!'
                } 
                res.redirect('/login')
            }

            

        }catch(error){
            res.send(error)
        }
        
    }

    logout(req,res){
        try{
            for (const key in req.session) {
                if (key != 'cart' && key!='cookie') {
                    delete req.session[key]
                }
            }
            res.redirect('/')
        }catch(error){
            console.log(error)
            res.redirect('/505')
        }
        
    }


}


module.exports = new UserController