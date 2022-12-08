const { Op } = require("sequelize")
const db = require("../../models")
const Constant = require("../../utilities/Constant")
const Controller = require("../Controller")

class CategoryController extends Controller{
    async index(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        let search = req.query.search || ''
        delete req.session.notification
        try{
            data.categories = await db.Category.findAll({
                where :{
                    name : {
                       [Op.like] : `%${search}%` 
                    }
                }
            })
            data.categories = CategoryController.pagination(req,data.categories)
        }
        catch(error){
            console.log(error)
        }
        
        res.render('admin/category/index',data)



    }
    async edit(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }

        try{
            let id = req.params.categoryId
            data.category = await db.Category.findByPk(id)
        }
        catch(error){
            console.log(error)
        }
        res.render('admin/category/edit',data)
    }
    async update(req,res){
        try{
            let id = req.body.id
            let category = await db.Category.findByPk(id)
            await category.update(req.body)
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Thay đổi thành công'
            }
           
        }
        catch(error){
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Thay đổi thất bại'
            } 
        }
        res.redirect(`category`)
    }
    async destroy(req,res){
        try{
            let category = await db.Category.findByPk(req.body.id)
            await category.destroy()
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Xóa thành công'
            } 
        }
        catch(error){
            console.log(error)
            req.session.notification = {
                tata : Constant.TATA['error'],
                message : 'Thay đổi thất bại'
            } 
        }
        res.redirect('category')
    }
    create(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        
        res.render('admin/category/create',data)
    }
    async store(req,res){
        try{
            await db.Category.create(req.body)
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Tạo category đổi thành công'
            }
        }
        catch(error){
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Tạo category thất bại'
            }
        }
        res.redirect('category')
    }

}


module.exports = new CategoryController