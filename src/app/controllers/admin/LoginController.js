const db = require("../../models")
const Account = require("../../utilities/Account")
const Constant = require("../../utilities/Constant")

class LoginController {
    index(req,res){
        let data = {
            layout : false,
            error : req.session.adminError || ''
        }
        delete req.session.adminError
        res.render('admin/login',data)
    }
    async checkAdmin(req,res){
        try{
            let AdminOrFail = await db.User.findOne({
                where : {
                    email : req.body.email,
                    level : Constant.USER_LEVEL['admin']
                }
            })
            if(AdminOrFail){
                let password = req.body.password
                let hashPassword = AdminOrFail.password
                let loggedIn = Account.comparePassword(password, hashPassword)
                if(loggedIn){
                    req.session.adminLoggerIn = true
                    req.session.admin = AdminOrFail
                    res.redirect('user')
                }
            }else{
                req.session.adminError = "Account or password is wrong or not authorized !"
                res.redirect('login')
            }

            

        }catch(error){
            console.log(error)
        }
    }
}



module.exports = new LoginController