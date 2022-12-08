const { Op } = require("sequelize")
const db = require("../../models")
const Constant = require("../../utilities/Constant")
const Controller = require("../Controller")

class BrandController extends Controller {
    async index(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        let search = req.query.search || ''
        delete req.session.notification
        try{
            data.brands = await db.Brand.findAll({
                where :{
                    name : {
                       [Op.like] : `%${search}%` 
                    }
                }
            })
            data.brands = BrandController.pagination(req,data.brands)
        }
        catch(error){
            console.log(error)
        }
        
        res.render('admin/brand/index',data)



    }
    async edit(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }

        try{
            let id = req.params.brandId
            data.brand = await db.Brand.findByPk(id)
        }
        catch(error){
            console.log(error)
        }
        res.render('admin/brand/edit',data)
    }
    async update(req,res){
        try{
            let id = req.body.id
            let brand = await db.Brand.findByPk(id)
            await brand.update(req.body)
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
        res.redirect(`brand`)
    }
    async destroy(req,res){
        try{
            let brand = await db.Brand.findByPk(req.body.id)
            await brand.destroy()
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
        res.redirect('brand')
    }
    create(req,res){
        let data = {
            title : 'Update User',
            notification : req.session?.notification,
            layout : 'admin/layout'
        }
        
        res.render('admin/brand/create',data)
    }
    async store(req,res){
        try{
            await db.Brand.create(req.body)
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Tạo brand đổi thành công'
            }
        }
        catch(error){
            req.session.notification = {
                tata : Constant.TATA['success'],
                message : 'Tạo brand thất bại'
            }
        }
        res.redirect('brand')
    }

}


module.exports = new BrandController