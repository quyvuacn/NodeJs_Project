const { Op } = require("sequelize")
const db = require("../../models")
const Constant = require("../../utilities/Constant")
const Account = require('../../utilities/Account')
const Controller = require("../Controller")
const uploadFiles = require("../../utilities/UploadFile")


class UserController extends Controller{
    async index(req,res){
        let data = {
            title : 'User',
            notification : req.session.notification,
            level : Constant.USER_LEVEL,
            layout : 'admin/layout'
        }
        let search = req.query.search || ''
        delete req.session.notification
        try{
            data.users = await db.User.findAll({
                where : {
                    [Op.or] : [
                        {
                            name: {[Op.like] : `%${search}%`},
                            email : {[Op.like] : `%${search}%`}
                        }
                    ]
                }
            })
            data.users = UserController.pagination(req,data.users)
            res.render('admin/user/index',data)
        }catch{

        }
    }
    async destroy(req,res){
        try{
            
            let user = await db.User.destroy({
                where : {
                    id : req.body.id,
                    level : {
                        [Op.in] : [Constant.USER_LEVEL['client'],Constant.USER_LEVEL['not_verifie']]
                    }
                }
            })
            if(!user){
                req.session.notification =  {
                    tata : Constant.TATA['error'],
                    message : 'Không thể xóa admin'
                }  
            }else{
                req.session.notification =  {
                    tata : Constant.TATA['success'],
                    message : 'Xóa user thành công'
                }  
            }
            res.redirect('user')
        }catch(error){
            req.session.notification =  {
                tata : Constant.TATA['error'],
                message : 'Không thể xóa admin'
            }  
            res.redirect('user')
        }
    }
    async show(req,res){
        let data = {
            title : 'User Info',
            notification : req.session.notification,
            layout : 'admin/layout',
            level : Constant.USER_LEVEL
        }
        try{

            data.user = await db.User.findByPk(req.params.userId)
        }catch(error){
            console.log(error)
        }
        res.render('admin/user/show',data)
    }
    async edit(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout',
            level : Constant.USER_LEVEL
        }
        try{
            let id = req.params.userId
            data.user = await db.User.findByPk(id)
            res.render('admin/user/edit',data)

        }catch(error){
            console.log(error)
        }
    }
    async update(req,res){
        try{
            let files = req.files?.image
            let dataUpdate = req.body

            if(files){
                let destroy_file_old = req.body.image_old
                dataUpdate.avatar =  uploadFiles(files,'front/img/user',destroy_file_old)
            }
            let userId = req.body.id
            let user = await db.User.findByPk(userId)
            await user.set(dataUpdate)
            user.save()  
            res.redirect(`user/${user.id}`)            
        }catch(error){
            console.log(error)
        }
    }
    create(req,res){
        let data = {
            title : 'Create User',
            notification : req.session?.notification,
            layout : 'admin/layout',
            level : Constant.USER_LEVEL
        }
        delete req.session.notification
        res.render('admin/user/create',data)
    }
    async store(req,res){
        try{
            let dataUser = req.body
            let files = req.files.image
            if(dataUser.password == dataUser.password_confirmation){
                dataUser.password = Account.hashPassword(dataUser.password)
                if(files){
                    dataUser.avatar = uploadFiles(files,'front/img/user')
                }
                let newUser = await db.User.create(dataUser)
                req.session.notification = {
                    tata : Constant.TATA['success'],
                    message : 'Tạo user thành công'
                }
                res.redirect(`${newUser.id}`)
            }else{
                req.session.notification = {
                    tata : Constant.TATA['error'],
                    message : 'Mật khẩu không trùng khớp'
                }
                res.redirect('create')
            }
              
        }catch{
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Email đã được sử dụng'
            }
            res.redirect('create')
        }
    }

}

module.exports = new UserController